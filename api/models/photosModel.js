const { ObjectId } = require('mongodb')
const MongoLib = require('../lib/mongo')
const path = require('path')
const { promisify } = require('util')
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
          'date': 1,
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

  async list ({ approved, favs = [], query }) {
    const photos = await this.mongoDB.aggregate({
      collection: this.collection,
      aggregation: [
        // eslint-disable-next-line standard/array-bracket-even-spacing
        ...query ? [{ $match: { $text: { $search: query } } } ] : [],
        { $match: { approved } },
        { $project: {
          'userId': 1,
          'likes': 1,
          'src': 1,
          'nombre': 1,
          'apellido': 1,
          'description': 1,
          'date': 1,
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
    const photosWhitLike = photos.map((photo) => ({
      ...photo,
      liked: favs.includes(photo._id.toString())
    }))
    return shuffleArray(photosWhitLike)
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
      dni,
      date: new Date()
    }
    await this.mongoDB.create(this.collection, photo)
    return { ...photo, liked: false }
  }

  async approvePhoto ({ _id }) {
    await this.mongoDB.update(
      this.collection,
      _id,
      { $set: { approved: true } }
    )
    return true
  }

  async removePhoto ({ _id, userId }) {
    const rm = promisify(require('fs').rm)
    rm(path.join(__dirname, '../images', `${userId}.jpg`))
    await this.mongoDB.delete(this.collection, _id)
  }

  async addComment ({ photoId, comment, userId, nombre, apellido }) {
    await this.mongoDB.update(
      this.collection,
      photoId,
      { $push: { comments: { userId, comment, nombre, apellido, approved: false } } }
    )
    return true
  }

  async approveComment ({ _id, userId, comment }) {
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
      aggregation: [{ $match: { approved: true } }, { $sort: { likes: -1, date: -1 } }]
    })
    let position = 0
    result.find((photo, index) => {
      if (userId.equals(ObjectId(photo.userId))) {
        position = index
        return true
      }
    })
    const photos = result.slice(0, 10)
    return {
      photos,
      position: position || result.length
    }
  }

  async searchPhotos ({ query }) {
    const result = await this.mongoDB.getAll(this.collection, { $text: { $search: query } })
    return result
  }
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

module.exports = PhotosModel
