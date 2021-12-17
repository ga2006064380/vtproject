/* eslint-disable no-param-reassign */
const fetch = require('node-fetch-commonjs')
const OAuth = require('oauth')
const { promisify } = require('util')
const { Op } = require('sequelize')
const { db, log } = require('../../../modules')

async function getTwitterUserProfileWithOAuth2() {
  const oauth2 = new OAuth.OAuth2(
    'pbCYjsHfTE29dWno4c7xhFLHM',
    '9c1msrIfG4mV5qw4A0ruMANxmE7Teg9YQ6dGxlBSbVE0HoXwEi',
    'https://api.twitter.com/',

    null,

    'oauth2/token',

    null
  )
  const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
  const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })
  return accessToken
}

async function fetchOldTweets(screen_name, max_id, list = []) {
  const accessToken = await getTwitterUserProfileWithOAuth2()
  // eslint-disable-next-line max-len
  const URL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screen_name}&max_id=${max_id}&include_rts=false&exclude_replies=true&count=200`
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const ytdata = await res.json()
    if (ytdata.length) {
    // eslint-disable-next-line no-param-reassign
      list = list.concat(ytdata)
      // eslint-disable-next-line eqeqeq
      if ((ytdata[ytdata.length - 1].id_str != max_id) && (list.length <= 200)) {
        return fetchOldTweets(screen_name, list[list.length - 1].id_str, list)
      }
      console.log(list.length)
      console.log(list[list.length - 1].id_str)
      return list
    }
    return []
  } catch (err) {
    console.log(err)
    return []
  }
}
async function test() {
  try {
    log.debug('tweetsListAPI() START')

    const uncrawledTwitters = await db.VTuber_List.findAll({
      where: {
        [Op.and]: [
          { yt_channel_id: { [Op.not]: null } },
          { twitter: { [Op.not]: null } }
        ]
      }
    })

    if (!uncrawledTwitters) {
      log.debug('tweetsListAPI() No twitter to be crawled')
      return
    }
    uncrawledTwitters.map(async (uncrawledTwitter) => {
      const count = await db.Tweet_List.count({ where: { twitterid: uncrawledTwitter.twitter } })
      if (count < 200) {
        console.log(uncrawledTwitter.twitter)
        const oldestTweets = await db.Tweet_List.findOne({
          where: {
            twitterid: uncrawledTwitter.twitter
          },
          order: [['tweet_created_at', 'ASC']]
        })
        const twitterTweets = await fetchOldTweets(uncrawledTwitter.twitter, oldestTweets.tweetsid)
          .catch((err) => {
            log.error('tweetsListAPI() Error fetching tweets', {
              channel: uncrawledTwitter.yt_channel_id,
              err: err.tostring()
            })
            return null
          })
        // console.log(twitterTweets)
        if (!twitterTweets || !twitterTweets.length) {
          log.debug('tweetsListAPI() No tweets to be saved')
          return
        }
        console.log('hello')

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
              log.error('tweetsListAPI() Cannot save to database', {
                videoInfo: { ...tweetInfo, description: '' },
                error: err.toString()
              })
              logResults[tweetInfo.id_str] = null
            })
        })

        await Promise.all(dbSaves)

        log.info('tweetsListAPI() Saved video list', { results: logResults })
      }
    })
  } catch (error) {
    log.error('tweetsListAPI() Uncaught error', { error: error.toString() })
  }
}
test()
