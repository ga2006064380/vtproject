/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
require('dotenv').config()
const moment = require('moment-timezone')
const fetch = require('node-fetch-commonjs')
const { Op } = require('sequelize')
const { db, log } = require('../../../modules')

const { env } = process

const utcDate = moment.tz('UTC')
async function videoTOLives() {
  try {
    const livedChannels = await db.Video_List.findAll({
      where: {
        [Op.and]: [
          { status: ['live', 'upcoming'] },
          { published_at: { [Op.between]: [utcDate.clone().subtract(48, 'hour'), utcDate.clone().add(24, 'hour')] } }
        ]
      },
      order: [
        ['status', 'ASC'],
        ['published_at', 'ASC']
      ]
    }).catch((err) => {
      // Catch and log db error
      log.error('videoTOLives() Unable to move videos to live', { error: err.toString() })
      // Return empty list, so the succeeding process for upcoming videos wil continue
      return []
    })
    if (!livedChannels || !livedChannels.length) {
      log.debug('videoStatusAPI() No videos to be moved')
      return
    }
    const logResults = {}

    const dbSaves = livedChannels.map((livedChannel) => (
      db.Live_List.upsert({
        yt_channel_id: livedChannel.yt_channel_id,
        yt_video_id: livedChannel.yt_video_id,
        title: livedChannel.title,
        published_at: livedChannel.published_at,
        status: livedChannel.status,
        updated_at: utcDate
      })
        .then((dbResult) => {
          logResults[livedChannel.yt_video_id] = dbResult
        })
        .catch((err) => {
          log.error('videoTOLives() Cannot upsert to database', {
            videoInfo: { ...livedChannel, description: '' },
            error: err.toString()
          })
          logResults[livedChannel.yt_video_id] = null
        })
    ))

    await Promise.all(dbSaves)
  } catch (error) {
    log.error('videoTOLives() Uncaught error', { error: error.toString() })
  }
}
async function fetchLiveInfo(videoID) {
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

async function updateLiveList() {
  try {
    const livedChannels = await db.Live_List.findAll({
      where: {
        status: ['live', 'upcoming']
      },
      order: [['updated_at', 'ASC']],
      limit: 50
    }).catch((err) => {
      // Catch and log db error
      log.error('videoTOLives() Unable to move videos to live', { error: err.toString() })
      // Return empty list, so the succeeding process for upcoming videos wil continue
      return []
    })
    if (!livedChannels || !livedChannels.length) {
      log.debug('updateLiveList() No videos to updated')
      return
    }

    livedChannels.map(async (livedChannel) => {
      const liveData = await fetchLiveInfo(livedChannel.yt_video_id)
        .catch((err) => {
          log.error('updateLiveList() Error fetching live info', {
            channel: livedChannel.yt_channel_id,
            err: err.tostring()
          })
          return null
        })
      const logResults = {}
      // eslint-disable-next-line eqeqeq
      if (liveData.status == 'past' || liveData.status == 'missing') {
        const data = { status: liveData.status, updated_at: utcDate }
        db.Live_List.destroy(
          { where: { yt_video_id: liveData.id } }
        ).then((dbResult) => {
          logResults[liveData.yt_video_id] = dbResult
        })
        db.Video_List.update(
          data,
          { where: { yt_video_id: liveData.id } }
        ).then((dbResult) => {
          logResults[liveData.yt_video_id] = dbResult
        })
          .catch((err) => {
            log.error('Video_List Cannot update', {
              videoInfo: { ...liveData, description: '' },
              error: err.toString()
            })
            logResults[liveData.yt_video_id] = null
          })
      } else {
        console.log(livedChannel.yt_video_id)
        console.log(liveData.live_viewers)
        // eslint-disable-next-line max-len
        const data = { status: liveData.status, title: liveData.title, viewer_count: liveData.live_viewers, updated_at: utcDate }
        db.Live_List.update(
        // eslint-disable-next-line no-undef
          data,
          { where: { yt_video_id: liveData.id } }
        )
          .then((dbResult) => {
            logResults[liveData.yt_video_id] = dbResult
          })
          .catch((err) => {
            log.error('updateLiveList() Cannot update', {
              videoInfo: { ...liveData, description: '' },
              error: err.toString()
            })
            logResults[liveData.yt_video_id] = null
          })
      }
      log.info('updateLiveList() update live info', { results: logResults })
    })
  } catch (error) {
    log.error('updateLiveList() Uncaught error', { error: error.toString() })
  }
}
module.exports = async () => {
  await videoTOLives()
  await updateLiveList()
}
