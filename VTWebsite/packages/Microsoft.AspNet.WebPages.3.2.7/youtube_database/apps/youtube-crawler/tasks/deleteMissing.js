const { db, log } = require('../../../modules')

async function deleteMissing() {
  try {
    const livedChannels = await db.Video_List.findAll({
      where: {
        status: ['missing']
      }
    }).catch((err) => {
      // Catch and log db error
      log.error('videoTOLives() Unable to move videos to live', { error: err.toString() })
      // Return empty list, so the succeeding process for upcoming videos wil continue
      return []
    })
    const logResults = {}
    // eslint-disable-next-line array-callback-return
    livedChannels.map((livedChannel) => {
      db.Video_List.destroy(
        { where: { yt_video_id: livedChannel.yt_video_id } }
      ).then((dbResult) => {
        logResults[livedChannel.yt_video_id] = dbResult
      })
    })
  } catch (error) {
    log.error('updateLiveList() Uncaught error', { error: error.toString() })
  }
}
deleteMissing()
