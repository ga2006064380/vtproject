/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { Sequelize } = require('sequelize')

const { env } = process

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS')
}

const db = new Sequelize({
  database: env.DATABASE_NAME,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  server: env.DATABASE_SERVER,
  dialect: 'mssql',
  pool: {
    min: 1 || Number(process.env.DBPOOL_MIN),
    max: 5 || Number(process.env.DBPOOL_MAX),
    idle: 15000,
    acquire: 60000,
    evict: 5000
  },
  define: {
    freezeTableName: true,
    underscored: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  }
})

const modelsPath = path.resolve('database', 'models')
// const modelsPath = path.resolve('../../../', 'database', 'models')
console.log(modelsPath)
fs.readdirSync(modelsPath)
  .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
  .forEach(async (file) => {
    const filepath = path.join(modelsPath, file)
    console.log(filepath)
    // console.log(filepath)
    const model = require(filepath)
    model.init(db, Sequelize)
  })
module.exports = { client: db, ...db.models }
