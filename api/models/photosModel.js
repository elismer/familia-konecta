const MongoLib = require('../lib/mongo')

class PhotosModel {
  constructor () {
    this.collection = 'photos'
    this.mongoDB = new MongoLib()
  }

  async find ({ id, favs = [] }) {
    const photo = this.mongoDB.getAll(this.collection, { id })
    return {
      ...photo,
      liked: favs.includes(id.toString())
    }
  }

  async addLike ({ id }) {
    await this.mongoDB.update(this.collection, { id }, { $inc: { likes: 1 } })
    return true
  }

  async removeLike ({ id }) {
    await this.mongoDB.update(this.collection, { id }, { $inc: { likes: -1 } })
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
      liked: favs.includes(photo.id.toString())
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

  async approvePhoto ({ id }) {
    await this.mongoDB.update(
      this.collection,
      { id },
      { $set: { approved: true } }
    )
    return true
  }

  async removePhoto ({ id }) {
    await this.mongoDB.delete(this.collection, id)
  }

  async addComment ({ id, comment, userId }) {
    await this.mongoDB.update(
      this.collection,
      { id },
      { $push: { comments: { userId, comment, approved: false } } }
    )
    return true
  }

  async approveComment ({ id, userId, comment }) {
    await this.mongoDB.update(
      this.collection,
      { id, 'comments.userId': userId, 'comments.comment': comment },
      { $set: { 'comments.$.approved': true } }
    )
    return true
  }

  async removeComment ({ id, userId, comment }) {
    await this.mongoDB.update(
      this.collection,
      { id },
      { $pull: { comments: { userId, comment } } }
    )
  }
}
module.exports = PhotosModel
