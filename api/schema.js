const UserModel = require('./models/userModel')
const PhotosModel = require('./models/photosModel')
const { gql } = require('apollo-server-express')
const { finished } = require('stream')
const path = require('path')
const jsonwebtoken = require('jsonwebtoken')
const { config: { jwtSecret }, config } = require('./config')
const { promisify } = require('util')
const { GraphQLUpload } = require('graphql-upload')
const userModel = new UserModel()
const photosModel = new PhotosModel()

const typeDefs = gql`
  scalar Upload
  type User {
    id: ID
    nombre: String
    apellido: String
    dni: Int
    isAdmin: Boolean
    hasPhoto: Boolean
  }

  type Comment {
    userId: ID
    nombre: String
    apellido: String
    comment: String
    approved: Boolean
  }

  type Photo {
    id: ID
    src: String
    likes: Int
    liked: Boolean
    userId: ID
    pos: Int
    description: String
    comments: [Comment]
    approved: Boolean
    nombre: String
    apellido: String
  }

  type PhotoAudit {
    id: ID
    src: String
    likes: Int
    liked: Boolean
    userId: ID
    pos: Int
    description: String
    comments: Comment
    approved: Boolean
    nombre: String
    apellido: String
  }

  type Query {
    favs: [Photo]
    photos(approved: Boolean): [Photo]
    commentsAudit:[PhotoAudit]
    photo(id: ID!): Photo
    topTen: [Photo]
  }

  type LoginResponse{
    token: String!
    userId: String!
  }

  input LikePhoto {
    id: ID!
  }

  input UserCredentials {
    dni: Int!
    password: Int!
  }

  input PhotoUpload {
    description: String
    file: Upload!
  }

  input PhotoRemove {
    photoId: ID!
    userId: ID!
  }

  input CommentUpload {
    photoId: ID!
    comment: String!
  }

  input CommentAudit {
    photoId: ID!
    comment: String!
    userId: ID!
  }

  type Mutation {
    likePhoto(input: LikePhoto!): Photo
    addPhoto(input: PhotoUpload!): Photo
    addComment(input: CommentUpload!): Comment
    approvePhoto(input: ID!): Boolean
    approveComment(input: CommentAudit!): Boolean
    removePhoto(input: PhotoRemove!): Boolean
    removeComment(input: CommentAudit!): Boolean
    signup(input: UserCredentials!): String
    login(input: UserCredentials!): LoginResponse
  }
`

async function checkIsUserLogged (context) {
  const { dni } = context
  // check if the user is logged
  if (!dni) throw new Error('you must be logged in to perform this action')
  // find the user and check if it exists
  const user = await userModel.find({ dni })
  // if user doesnt exist, throw an error
  if (!user) throw new Error('user does not exist')
  return user
}

async function tryGetFavsFromUserLogged (context) {
  try {
    const { dni } = await checkIsUserLogged(context)
    const user = await userModel.find({ dni })
    return user.favs
  } catch (e) {
    return []
  }
}

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    async likePhoto (_, { input }, context) {
      const { dni, _id } = await checkIsUserLogged(context)

      // find the photo by id and throw an error if it doesn't exist
      const { id: photoId } = input
      const photo = await photosModel.find({ id: photoId })
      if (!photo) {
        throw new Error(`Couldn't find photo with id ${photoId}`)
      }

      const hasFav = await userModel.hasFav({ dni, photoId })
      try {
        if (hasFav) {
          await photosModel.removeLike({ id: photoId })
          await userModel.removeFav({ _id, photoId })
        } else {
          // put a like to the photo and add the like to the user database
          await photosModel.addLike({ id: photoId })
          await userModel.addFav({ _id, photoId })
        }
        // get the updated photos model
        const actualPhoto = await photosModel.find({ id: photoId, favs: hasFav ? [] : [photoId] })
        console.log(actualPhoto)
        return actualPhoto
      } catch (error) {
        console.error(error)
      }
    },
    // Handle user signup
    async signup (_, { input }) {
      const { dni, email, password } = input

      const user = await userModel.find({ dni })

      if (!user) {
        throw new Error(`No user with that DNI`)
      }

      const newUser = await userModel.create({
        dni,
        email,
        password
      })

      // return json web token
      return jsonwebtoken.sign(
        { id: newUser.id, dni },
        jwtSecret,
        { expiresIn: '1d' }
      )
    },

    // Handles user login
    async login (_, { input }) {
      const { dni, password } = input
      const user = await userModel.find({ dni })

      if (!user) {
        throw new Error('No user with that dni')
      }
      const valid = password === user.password
      if (!valid) {
        throw new Error('Incorrect password')
      }
      const { _id: id, favs, ...data } = user
      const token = jsonwebtoken.sign(
        { id, ...data },
        jwtSecret,
        { expiresIn: '1d' })
      // return json web token
      return { token, userId: id }
    },

    async addPhoto (parent, { input: { file, description } }, context) {
      const { _id, nombre, apellido, dni } = await checkIsUserLogged(context)
      const { createReadStream } = await file

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream()

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require('fs').createWriteStream(path.join(__dirname, `/images/`, `${_id}.jpg`))
      stream.pipe(out)
      const finishedPromise = promisify(finished)
      try {
        await finishedPromise(out)
        const newPhoto = await photosModel.create({ userId: _id, description, src: `${config.imageBaseUrl}${_id}.jpg`, nombre, apellido, dni })
        await userModel.hasPhoto({ _id })
        return newPhoto
      } catch (error) {
        console.error(error)
      }
    },

    async addComment (_, { input: { photoId, comment } }, context) {
      const { _id, nombre, apellido } = await checkIsUserLogged(context)
      const newComment = await photosModel.addComment({ photoId, userId: _id, nombre, apellido, comment })
      return newComment
    },

    async approvePhoto (_, { input }, context) {
      await checkIsUserLogged(context)
      await photosModel.approvePhoto({ _id: input })
      return true
    },

    async approveComment (_, { input: { photoId, userId, comment } }, context) {
      await checkIsUserLogged(context)
      await photosModel.approveComment({ _id: photoId, userId, comment })
      return true
    },

    async removePhoto (_, { input: { photoId, userId } }, context) {
      await checkIsUserLogged(context)
      await photosModel.removePhoto({ _id: photoId, userId })
      return true
    },

    async removeComment (_, { input: { photoId, userId, comment } }, context) {
      await checkIsUserLogged(context)
      await photosModel.removeComment({ _id: photoId, userId, comment })
      return true
    }
  },
  Query: {
    async favs (_, __, context) {
      const { _id } = await checkIsUserLogged(context)
      const { favs } = userModel.find({ _id })
      return photosModel.list({ ids: favs, favs })
    },
    async commentsAudit (_, __, context) {
      await checkIsUserLogged(context)
      return await photosModel.listComments()
    },
    async photo (_, { id }, context) {
      const favs = await tryGetFavsFromUserLogged(context)
      return await photosModel.find({ id, favs })
    },
    async photos (_, { approved }, context) {
      const favs = await tryGetFavsFromUserLogged(context)
      return await photosModel.list({ approved, favs })
    },
    async topTen (_, __, context) {
      const { _id } = await checkIsUserLogged(context, 'topTen')
      return await photosModel.topTen({ userId: _id })
    }
  },
  User: {
    id: (root) => root._id
  },
  Photo: {
    id: (root) => root._id
  },
  PhotoAudit: {
    id: (root) => root._id
  }
}

module.exports = { typeDefs, resolvers }
