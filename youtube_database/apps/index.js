require('dotenv').config()
const moment = require('moment-timezone')
const schedule = require('node-schedule-tz')

const { log } = require('../modules')
const videoListAPI = require('./youtube-crawler/tasks/video-list-api')
const videoLeastAPI = require('./youtube-crawler/tasks/video-least-api')
const liveUpdateAPI = require('./youtube-crawler/tasks/live-update-api')
const videoUpdateAPI = require('./youtube-crawler/tasks/video-update-api')
const tweetsLeastAPI = require('./twitter-crawler/tasks/tweets-least-api')

const { env } = process

log.info('YOUTUBE CRAWLER | %s | %s', 'production', moment().format('YYYY-MM-DD HH:mm:ss ZZ'))

schedule.scheduleJob('videoListAPI', env.SCHEDULE_VIDEO_LIST_API, 'Asia/Tokyo', videoListAPI)

schedule.scheduleJob('videoLeastAPI', env.SCHEDULE_VIDEO_LEAST_API, 'Asia/Tokyo', videoLeastAPI)

schedule.scheduleJob('liveUpdateAPI', env.SCHEDULE_LIVE_UPDATE_API, 'Asia/Tokyo', liveUpdateAPI)

schedule.scheduleJob('videoUpdateAPI', env.SCHEDULE_VIDEO_UPDATE_API, 'Asia/Tokyo', videoUpdateAPI)

schedule.scheduleJob('tweetsLeastAPI', env.SCHEDULE_TWEETS_LEAST_API, 'Asia/Tokyo', tweetsLeastAPI)
