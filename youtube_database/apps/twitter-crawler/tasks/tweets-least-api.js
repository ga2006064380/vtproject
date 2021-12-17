/* eslint-disable no-else-return */
require('dotenv').config()
const fetch = require('node-fetch-commonjs')
const OAuth = require('oauth')
const { promisify } = require('util')
const { Op } = require('sequelize')
const { db, log } = require('../../../modules')

const { env } = process

async function getTwitterUserProfileWithOAuth2() {
  const oauth2 = new OAuth.OAuth2(
    env.TWITTER_API_KEY,
    env.TWITTER_API_SECRET,
    'https://api.twitter.com/',

    null,

    'oauth2/token',

    null
  )
  const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
  const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })
  return accessToken
}

async function fetchFirstSaveTweets(screen_name, count = '200') {
  const accessToken = await getTwitterUserProfileWithOAuth2()
  // eslint-disable-next-line max-len
  const URL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screen_name}&include_rts=false&exclude_replies=true&count=${count}`
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const ytdata = await res.json()
    // eslint-disable-next-line array-callback-return
    return ytdata
  } catch (err) {
    console.log(err)
    return []
  }
}

async function fetchNewTweets(screen_name, since_id, count = '200') {
  const accessToken = await getTwitterUserProfileWithOAuth2()
  // eslint-disable-next-line max-len
  const URL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screen_name}&since_id=${since_id}&include_rts=false&exclude_replies=true&count=${count}`
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const ytdata = await res.json()
    return ytdata
  } catch (err) {
    console.log(err)
    return []
  }
}

async function test() {
  try {
    log.debug('tweetsLeastAPI() START')

    const uncrawledTwitters = await db.VTuber_List.findAll({
      where: {
        [Op.and]: [
          { yt_channel_id: { [Op.not]: null } },
          { twitter: { [Op.not]: null } }
        ]
      }
    })

    if (!uncrawledTwitters) {
      log.debug('tweetsLeastAPI() No twitter to be crawled')
      return
    }
    uncrawledTwitters.map(async (uncrawledTwitter) => {
      const newerTweets = await db.Tweet_List.findOne({
        where: {
          twitterid: uncrawledTwitter.twitter
        },
        order: [['tweet_created_at', 'DESC']]
      })
      if (!newerTweets) {
        const twitterTweets = await fetchFirstSaveTweets(uncrawledTwitter.twitter)
          .catch((err) => {
            log.error('tweetsLeastAPI() Error fetching tweets', {
              channel: uncrawledTwitter.yt_channel_id,
              err: err.tostring()
            })
            return null
          })
        if (!twitterTweets || !twitterTweets.length) {
          log.debug('tweetsLeastAPI() No tweets to be saved')
          return
        }

        const logResults = {}

        // eslint-disable-next-line array-callback-return
        const dbSaves = twitterTweets.map((tweetInfo) => {
          const data = { twitterid: uncrawledTwitter.twitter,
            tweetsid: tweetInfo.id_str,
            tweet_created_at: tweetInfo.created_at }
          db.Tweet_List.upsert(data)
            .then((dbResult) => {
              logResults[tweetInfo.id_str] = dbResult
            })
            .catch((err) => {
              log.error('tweetsLeastAPI() Cannot save to database', {
                tweetInfo: { ...tweetInfo, description: '' },
                error: err.toString()
              })
              logResults[tweetInfo.id_str] = null
            })
        })

        await Promise.all(dbSaves)

        log.info('tweetsLeastAPI() Saved video list', { results: logResults })
      } else {
        const twitterTweets = await fetchNewTweets(uncrawledTwitter.twitter, newerTweets.tweetsid)
          .catch((err) => {
            log.error('tweetsLeastAPI() Error fetching tweets', {
              channel: uncrawledTwitter.yt_channel_id,
              err: err.tostring()
            })
            return null
          })
        if (!twitterTweets || !twitterTweets.length) {
          log.debug('tweetsLeastAPI() No tweets to be saved')
          return
        }
        const logResults = {}

        // eslint-disable-next-line array-callback-return
        const dbSaves = twitterTweets.map((tweetInfo) => {
          const data = { twitterid: uncrawledTwitter.twitter,
            tweetsid: tweetInfo.id_str,
            tweet_created_at: tweetInfo.created_at }
          db.Tweet_List.upsert(data)
            .then((dbResult) => {
              logResults[tweetInfo.id_str] = dbResult
            })
            .catch((err) => {
              log.error('tweetsLeastAPI() Cannot save to database', {
                tweetInfo: { ...tweetInfo, description: '' },
                error: err.toString()
              })
              logResults[tweetInfo.id_str] = null
            })
        })

        await Promise.all(dbSaves)

        log.info('tweetsLeastAPI() Saved video list', { results: logResults })
      }
    })
  } catch (error) {
    log.error('tweetsLeastAPI() Uncaught error', { error: error.toString() })
  }
}
test()
