const { ObjectId } = require('mongodb')
const MongoLib = require('../lib/mongo')

class PhotosModel {
  constructor () {
    this.collection = 'photos'
    this.mongoDB = new MongoLib()
  }

  async find ({ id, favs = [] }) {
    const photo = await this.mongoDB.aggregate({
      collection: this.collection,
      aggregation: [
        { $match: { _id: ObjectId(id), approved: true } },
        { $project: {
          'likes': 1,
          'src': 1,
          'nombre': 1,
          'apellido': 1,
          'description': 1,
          'comments': {
            $slice: [
              { $filter: {
                'input': '$comments',
                'as': 'comment',
                'cond': { $eq: ['$$comment.approved', true] }
              } }, 2
            ]
          }
        } }
      ]
    })
    return {
      ...photo[0],
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
    const photos = await this.mongoDB.aggregate({
      collection: this.collection,
      aggregation: [
        { $match: { approved } },
        { $project: {
          'likes': 1,
          'src': 1,
          'nombre': 1,
          'apellido': 1,
          'description': 1,
          'comments': {
            $slice: [
              { $filter: {
                'input': '$comments',
                'as': 'comment',
                'cond': { $eq: ['$$comment.approved', true] }
              } }, 2
            ]
          }
        } }
      ]
    })
    return photos.map((photo) => ({
      ...photo,
      liked: favs.includes(photo._id.toString())
    }))
  }

  async listComments () {
    const comments = await this.mongoDB.aggregate({
      collection: this.collection,
      aggregation: [
        { $unwind: { path: '$comments', preserveNullAndEmptyArrays: false } },
        { $match: { 'comments.approved': false } }
      ]
    })
    return comments
  }

  async create ({ userId, description, src, nombre, apellido, dni }) {
    const photo = {
      userId,
      description,
      approved: false,
      likes: 0,
      comments: [],
      src,
      nombre,
      apellido,
      dni
    }
    await this.mongoDB.create(this.collection, photo)
    return true
  }

  async approvePhoto ({ _id }) {
    await this.mongoDB.update(
      this.collection,
      _id,
      { $set: { approved: true } }
    )
    return true
  }

  async removePhoto ({ _id }) {
    console.log({_id})
    await this.mongoDB.delete(this.collection, _id)
  }

  async addComment ({ photoId, comment, userId, nombre, apellido }) {
    console.log({userId})
    await this.mongoDB.update(
      this.collection,
      photoId,
      { $push: { comments: { userId, comment, nombre, apellido, approved: false } } }
    )
    return true
  }

  async approveComment ({ _id, userId, comment }) {
    console.log({ _id, userId, comment })
    await this.mongoDB.updateComment(
      this.collection,
      { _id: ObjectId(_id), 'comments.userId': ObjectId(userId), 'comments.comment': comment },
      { $set: { 'comments.$.approved': true } }
    )
    return true
  }

  async removeComment ({ _id, userId, comment }) {
    await this.mongoDB.update(
      this.collection,
      _id,
      { $pull: { comments: { userId: ObjectId(userId), comment } } }
    )
  }

  async topTen ({ userId }) {
    const result = await this.mongoDB.aggregate({
      collection: this.collection,
      aggregation: [{ $match: { approved: true } }, { $sort: { likes: -1 } }]
    })
    const ranking = result.findIndex(photo => userId.equals(photo.userId))
    let myPhoto = {}
    if (ranking > 9) {
      myPhoto = result[ranking]
      myPhoto.pos = ranking + 1
    }
    const firstTen = result.slice(0, 10).map((photo, index) => ({ ...photo, pos: index + 1 }))
    return myPhoto.ranking ? [...firstTen, ...[myPhoto]] : firstTen
  }
}
module.exports = PhotosModel
