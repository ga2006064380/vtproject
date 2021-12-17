const { Model } = require('sequelize')

class VTuber_List extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        yt_channel_id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        yt_channel_name: DataTypes.STRING,
        org: DataTypes.STRING,
        suborg: {
          type: DataTypes.STRING,
          allowNull: true
        },
        photo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        twitter: {
          type: DataTypes.STRING,
          allowNull: true
        },
        subscriber_count: DataTypes.INTEGER,
        created_at: {
          type: DataTypes.DATE
        },
        updated_at: {
          type: DataTypes.DATE
        },
        crawled_at: {
          type: DataTypes.DATE
        }
      },
      {
        tableName: 'VTuber_List',
        sequelize
      }
    )
  }
}

module.exports = VTuber_List
