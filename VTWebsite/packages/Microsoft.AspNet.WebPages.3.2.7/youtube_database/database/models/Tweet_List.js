const { Model } = require('sequelize')

class Tweet_List extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        twitterid: DataTypes.STRING,
        tweetsid: {
          type: DataTypes.BIGINT,
          primaryKey: true
        },
        tweet_created_at: {
          type: DataTypes.DATE
        },
        created_at: {
          type: DataTypes.DATE
        },
        updated_at: {
          type: DataTypes.DATE
        }
      },
      {
        tableName: 'Tweet_List',
        sequelize
      }
    )
  }
}
module.exports = Tweet_List
