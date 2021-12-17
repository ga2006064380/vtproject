/* eslint-disable no-unused-vars */
require('dotenv').config()
const moment = require('moment-timezone')
const fetch = require('node-fetch-commonjs')
const { Op } = require('sequelize')
const { db, log } = require('../../../modules')

const { env } = process

async function fetchAllChannelVideos(channelID, offset, list = []) {
  // eslint-disable-next-line max-len
  const URL = `https://holodex.net/api/v2/videos?channel_id=${channelID}&limit=50&offset=${offset}`
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.X_API_KEY
      }
    })
    const ytdata = await res.json()
    // eslint-disable-next-line no-param-reassign
    list = list.concat(ytdata)
    if (ytdata.length === 50) {
      return fetchAllChannelVideos(channelID, list.length, list)
    }
    return list
  } catch (err) {
    log.error('videoListAPI() YouTube fetch error', {
      error: err.toString(),
      channelID
    })
    return []
  }
}

module.exports = async () => {
  try {
    log.debug('videoListAPI() START')

    const utcDate = moment.tz('UTC')

    const uncrawledChannel = await db.VTuber_List.findOne({
      where: {
        [Op.and]: [
          { yt_channel_id: { [Op.not]: null } },
          { crawled_at: { [Op.is]: null } }
        ]
      }
    })

    if (!uncrawledChannel) {
      log.debug('videoListAPI() No channels to be crawled')
      return
    }

    uncrawledChannel.crawled_at = utcDate
    await uncrawledChannel.save()
      .catch((err) => {
        log.error('videoListAPI() Unable to mark channel as crawled', {
          channel: uncrawledChannel.yt_channel_id,
          error: err.tostring()
        })
      })

    const channelVideos = await fetchAllChannelVideos(uncrawledChannel.yt_channel_id)
      .catch((err) => {
        log.error('videoListAPI() Error fetching video list', {
          channel: uncrawledChannel.yt_channel_id,
          err: err.tostring()
        })
        return null
      })

    if (!channelVideos || !channelVideos.length) {
      log.debug('videoListAPI() No videos to be saved')
      return
    }

    const logResults = {}
    // eslint-disable-next-line array-callback-return
    const dbSaves = channelVideos.map((videoInfo) => {
      // eslint-disable-next-line eqeqeq
      if (videoInfo.status != 'missing') {
        // eslint-disable-next-line eqeqeq
        if (videoInfo.status == 'upcoming') {
          const data = { yt_channel_id: uncrawledChannel.yt_channel_id,
            yt_video_id: videoInfo.id,
            title: videoInfo.title,
            published_at: moment(videoInfo.available_at).tz('UTC'),
            status: videoInfo.status,
            updated_at: utcDate }
        } else {
          const data = { yt_channel_id: uncrawledChannel.yt_channel_id,
            yt_video_id: videoInfo.id,
            title: videoInfo.title,
            published_at: moment(videoInfo.published_at).tz('UTC'),
            status: videoInfo.status,
            updated_at: utcDate }
        }
        // eslint-disable-next-line no-undef
        db.Video_List.upsert(data)
          .then((dbResult) => {
            logResults[videoInfo.yt_video_id] = dbResult
          })
          .catch((err) => {
            log.error('videoListAPI() Cannot save to database', {
              videoInfo: { ...videoInfo, description: '' },
              error: err.toString()
            })
            logResults[videoInfo.yt_video_id] = null
          })
      }
    })

    await Promise.all(dbSaves)

    log.info('videoListAPI() Saved video list', { results: logResults })
  } catch (error) {
    log.error('videoListAPI() Uncaught error', { error: error.toString() })
  }
}
