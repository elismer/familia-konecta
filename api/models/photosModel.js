const MongoLib = require('../lib/mongo')

class PhotosModel {
  constructor () {
    this.collection = 'photos'
    this.mongoDB = new MongoLib()
  }

  async find ({ _id, favs = [] }) {
    const photo = this.mongoDB.getAll(this.collection, { _id })
    return {
      ...photo,
      liked: favs.includes(_id.toString())
    }
  }

  async addLike ({ _id }) {
    await this.mongoDB.update(this.collection, { _id }, { $inc: { likes: 1 } })
    return true
  }

  async removeLike ({ _id }) {
    await this.mongoDB.update(this.collection, { _id }, { $inc: { likes: -1 } })
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

  async create ({ userId, description }) {
    const photo = {
      userId,
      description,
      approved: false,
      likes: 0,
      comments: []
    }
    await this.mongoDB.create(this.collection, photo)
    return true
  }

  async approvePhoto ({ _id }) {
    await this.mongoDB.update(
      this.collection,
      { _id },
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
      { _id },
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
      { _id },
      { $pull: { comments: { userId, comment } } }
    )
  }
}
module.exports = PhotosModel
