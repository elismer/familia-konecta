const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName
const HOST = config.dbHost
const PORT = config.dbPort

const MONGO_URI = PORT
  ? `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}?authSource=admin`
  : `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor () {
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true
    })
    this.dbName = DB_NAME
  }

  connect () {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err)
          }

          console.log('Connected succesfully to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }

    return MongoLib.connection
  }

  aggregate ({ collection, aggregation }) {
    const result = this.connect().then((db) => {
      return db.collection(collection).aggregate(aggregation).toArray()
    })
    return result
  }

  getAll (collection, query, projection) {
    const result = this.connect().then((db) => {
      return projection
        ? db.collection(collection).find(query, projection).toArray()
        : db.collection(collection).find(query).toArray()
    })
    return result
  }

  get (collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne(query)
    })
  }

  create (collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data)
      })
      .then((result) => result.insertedId)
  }

  update (collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, data, { upsert: true })
      })
      .then((result) => result.upsertedId || id)
  }

  updateComment (collection, query, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne(query, data, { upsert: true })
      })
      .then((result) => result.upsertedId || query._id)
  }

  delete (collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) })
      })
      .then(() => id)
  }
}

module.exports = MongoLib
