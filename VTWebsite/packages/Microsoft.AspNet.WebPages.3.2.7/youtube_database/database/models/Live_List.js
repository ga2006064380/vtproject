const { Model } = require('sequelize')

class Live_List extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        yt_channel_id: DataTypes.STRING,
        yt_video_id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        title: DataTypes.STRING,
        viewer_count: DataTypes.INTEGER,
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
        tableName: 'Live_List',
        sequelize
      }
    )
  }
}
module.exports = Live_List
