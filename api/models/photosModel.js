const { ObjectId } = require('mongodb')
const MongoLib = require('../lib/mongo')

class PhotosModel {
  constructor () {
    this.collection = 'photos'
    this.mongoDB = new MongoLib()
  }

  async find ({ id, favs = [] }) {
    const photo = await this.mongoDB.get(this.collection, { _id: ObjectId(id) })
    return {
      ...photo,
      liked: favs.includes(id.toString())
    }
  }

  async addLike ({ id }) {
    await this.mongoDB.update(this.collection, id, { '$inc': { likes: 1 } })
    return true
  }

  async removeLike ({ id }) {
    await this.mongoDB.update(this.collection, id, { '$inc': { likes: -1 } })
    return true
  }

  async list ({ approved, favs = [] }) {
    const photos = await this.mongoDB.getAll(
      this.collection,
      {
        approved
      },
      {
        comments: { $slice: 2 }
      }
    )
    return photos.map((photo) => ({
      ...photo,
      liked: favs.includes(photo._id.toString())
    }))
  }

  async create ({ userId, description, src }) {
    const photo = {
      userId,
      description,
      approved: false,
      likes: 0,
      comments: [],
      src
    }
    await this.mongoDB.create(this.collection, photo)
    return true
  }

  async approvePhoto ({ _id }) {
    console.log({_id})
    await this.mongoDB.update(
      this.collection,
      _id,
      { $set: { approved: true } }
    )
    return true
  }

  async removePhoto ({ _id }) {
    await this.mongoDB.delete(this.collection, _id)
  }

  async addComment ({ _id, comment, userId }) {
    await this.mongoDB.update(
      this.collection,
      _id,
      { $push: { comments: { userId, comment, approved: false } } }
    )
    return true
  }

  async approveComment ({ _id, userId, comment }) {
    await this.mongoDB.update(
      this.collection,
      { _id, 'comments.userId': userId, 'comments.comment': comment },
      { $set: { 'comments.$.approved': true } }
    )
    return true
  }

  async removeComment ({ _id, userId, comment }) {
    await this.mongoDB.update(
      this.collection,
      _id,
      { $pull: { comments: { userId, comment } } }
    )
  }

  async topTen ({ userId }) {
    const result = await this.mongoDB.aggregate({
      collection: this.collection,
      aggregation: [{ $match: { approved: true } }, { $sort: { likes: -1 } }]
    })
    const ranking = result.findIndex(photo => photo.userId === userId)
    let myPhoto = {}
    if (ranking > 9) {
      myPhoto = result[ranking]
      myPhoto.pos = ranking
    }
    const firstTen = result.slice(0, 10).map((photo, index) => ({ ...photo, pos: index + 1 }))
    return myPhoto.ranking ? [...firstTen, ...[myPhoto]] : firstTen
  }
}
module.exports = PhotosModel
