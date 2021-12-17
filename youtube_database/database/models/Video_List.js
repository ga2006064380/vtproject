const { Model } = require('sequelize')

class Video_List extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        yt_channel_id: DataTypes.STRING,
        yt_video_id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        title: DataTypes.STRING,
        published_at: DataTypes.DATE,
        status: DataTypes.STRING,
        created_at: {
          type: DataTypes.DATE
        },
        updated_at: {
          type: DataTypes.DATE
        }
      },
      {
        tableName: 'Video_List',
        sequelize
      }
    )
  }
}
module.exports = Video_List
