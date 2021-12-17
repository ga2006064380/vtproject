/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const moment = require('moment-timezone')
const fetch = require('node-fetch-commonjs')
const { Op } = require('sequelize')
const { db, log } = require('../../../modules')

async function listChannel(org, limit) {
  // eslint-disable-next-line max-len
  const URL = `https://holodex.net/api/v2/channels?type=vtuber&limit=${limit}&org=${org}&sort=group`
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '89683489-7aa9-477f-a522-b8a02b44ed70'
      }
    })
    const ytdata = await res.json()
    return ytdata
  } catch (err) {
    log.error('listChannel() YouTube fetch error', {
      error: err.toString(),
      org
    })
    return []
  }
}

async function getChannelInformation(channelID) {
  // eslint-disable-next-line max-len
  const URL = `https://holodex.net/api/v2/channels/${channelID}`
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '89683489-7aa9-477f-a522-b8a02b44ed70'
      }
    })
    const ytdata = await res.json()
    return ytdata
  } catch (err) {
    log.error('getChannelInformationAPI() YouTube fetch error', {
      error: err.toString(),
      channelID
    })
    return []
  }
}

async function test(org, limit) {
  try {
    log.debug('getChannelInformationAPI() START')

    const uncrawledChannels = (await listChannel(org, limit)).flat()
    // eslint-disable-next-line consistent-return
    const Channelids = uncrawledChannels.map(async (uncrawledChannel) => {
      const channelInfo = await getChannelInformation(uncrawledChannel.id)
      if (channelInfo.suborg !== 'z INACTIVE') {
        const logResults = {}
        db.VTuber_List.upsert({
          yt_channel_id: channelInfo.id,
          yt_channel_name: channelInfo.name,
          org: channelInfo.org,
          // suborg: channelInfo.suborg.substring(2),
          photo: channelInfo.photo,
          twitter: channelInfo.twitter,
          subscriber_count: channelInfo.subscriber_count,
          updated_at: moment.tz('UTC')
        })
          .then((dbResult) => {
            logResults[channelInfo.id] = dbResult
          })
          .catch((err) => {
            log.error('channelInfo() Cannot save to database', {
              error: err.toString()
            })
            logResults[channelInfo.id] = null
          })
        log.info('channelInfo() Saved channel information', { results: logResults })
      } else {
        return null
      }
    })
  } catch (error) {
    log.error('getChannelInformationAPI() Uncaught error', { error: error.toString() })
  }
}
test('Cloud Horizon', 4)
