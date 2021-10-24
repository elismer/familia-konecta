const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const MongoLib = require('../lib/mongo')

class UserModel {
  constructor () {
    this.collection = 'users'
    this.mongo = new MongoLib()
  }

  async addFav ({ _id, photoId }) {
    await this.mongo.update(
      this.collection,
      _id,
      { '$push': { 'favs': photoId } }
    )
  }

  async removeFav ({ _id, photoId }) {
    await this.mongo.update(
      this.collection,
      _id,
      { '$pull': { 'favs': photoId } }
    )
  }

  async hasFav ({ dni, photoId }) {
    console.log({ dni, photoId })
    const user = await this.mongo.aggregate(
      { collection: this.collection,
        aggregation: [ { $match: { $and: [{ dni }, { favs: photoId }] } } ] }
    )
    const hasFav = user[0]?.favs
    return hasFav
  }

  async create ({ dni, email, password }) {
    const avatarHash = crypto.createHash('md5').update(email).digest('hex')
    const avatar = `https://gravatar.com/avatar/${avatarHash}`

    // Create a user
    const user = {
      id: uuidv1(), // with a unique user id
      password: await bcrypt.hash(password, 10), // with the encrypted password
      favs: [],
      avatar,
      email,
      dni
    }

    // Write in db.json
    // db.get('users').push(user).write()
    await this.mongo.create(this.collection, user)
    return user
  }
  async hasPhoto ({ _id }) {
    return await this.mongo.update(this.collection, _id, { $set: { hasPhoto: true } })
  }

  async find ({ dni }) {
    return this.mongo.get(this.collection, { dni })
  }
}

module.exports = UserModel
