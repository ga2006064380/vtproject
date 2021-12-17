const db = require('./db')
const error = require('./error')
const log = require('./logger')

module.exports = {
  ...error,
  db,
  log
}
