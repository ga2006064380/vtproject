/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
require('dotenv').config()
const moment = require('moment-timezone')
const fetch = require('node-fetch-commonjs')
const { Op } = require('sequelize')
const { db, log } = require('../../../modules')

const { env } = process

const utcDate = moment.tz('UTC')

async function fetchVideoInfo(videoID) {
  // eslint-disable-next-line max-len
  const URL = `https://holodex.net/api/v2/videos/${videoID}`
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.X_API_KEY
      }
    })
    const ytdata = await res.json()
    return ytdata
  } catch (err) {
    log.error('fetchLiveInfo() YouTube fetch error', {
      error: err.toString(),
      videoID
    })
    db.Live_List.destroy(
      { where: { yt_video_id: videoID } }
    )
    db.Video_List.destroy(
      { where: { yt_video_id: videoID } }
    )
    return []
  }
}

async function test() {
  try {
    const videoList = await db.Live_List.findAll({
      where: {
        status: ['live', 'upcoming']
      },
      order: [['updated_at', 'ASC']],
      limit: 200
    }).catch((err) => {
      // Catch and log db error
      log.error('videoTOLives() Unable to move videos to live', { error: err.toString() })
      // Return empty list, so the succeeding process for upcoming videos wil continue
      return []
    })
    if (!videoList || !videoList.length) {
      log.debug('updateLiveList() No videos to updated')
      return
    }

    videoList.map(async (video) => {
      const videoInfo = await fetchVideoInfo(video.yt_video_id)
        .catch((err) => {
          log.error('updateLiveList() Error fetching live info', {
            channel: video.yt_channel_id,
            err: err.tostring()
          })
          return null
        })
      const logResults = {}
      // eslint-disable-next-line eqeqeq
      if (videoInfo.status == 'missing') {
        db.Video_List.destroy(
          { where: { yt_video_id: videoInfo.id } }
        ).then((dbResult) => {
          logResults[videoInfo.yt_video_id] = dbResult
        })
      } else {
        const data = { status: videoInfo.status, updated_at: utcDate }
        db.Video_List.update(
          // eslint-disable-next-line no-undef
          data,
          { where: { yt_video_id: videoInfo.id } }
        )
          .then((dbResult) => {
            logResults[videoInfo.yt_video_id] = dbResult
          })
          .catch((err) => {
            log.error('updateLiveList() Cannot update', {
              videoInfo: { ...videoInfo, description: '' },
              error: err.toString()
            })
            logResults[videoInfo.yt_video_id] = null
          })
      }
      log.info('updateLiveList() update live info', { results: logResults })
    })
  } catch (error) {
    log.error('updateLiveList() Uncaught error', { error: error.toString() })
  }
}
test()
