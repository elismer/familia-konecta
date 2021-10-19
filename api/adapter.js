const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const json = require('./db.json')
const db = low(new FileSync('./db.json'))
db.defaults(json).write()

module.exports = db
