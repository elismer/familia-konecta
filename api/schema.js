const UserModel = require('./models/userModel')
const PhotosModel = require('./models/photosModel')
const { gql } = require('apollo-server-express')
const { finished } = require('stream')
const jsonwebtoken = require('jsonwebtoken')
const { config: { jwtSecret } } = require('./config')

const userModel = new UserModel()
const photosModel = new PhotosModel()

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: ID
    nombre: String
    apellido: String
    dni: Int
    isAdmin: Boolean
  }

  type Comment {
    userId: ID
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
  }

  type Query {
    favs: [Photo]
    photos(approved: Boolean): [Photo]
    photo(id: ID!): Photo
    topTen: [Photo]
  }

  input LikePhoto {
    id: ID!
  }

  input UserCredentials {
    dni: Int!
    password: Int!
  }

  input PhotoUpload {
    userId: ID
    description: String
    file: Upload!
  }

  input CommentUpload {
    photoId: ID!
    userId: ID!
    comment: String!
  }

  type Mutation {
    likePhoto(input: LikePhoto!): Photo
    addPhoto(input: PhotoUpload!): Photo
    addComment(input: CommentUpload!): Comment
    approvePhoto(input: ID!): Boolean
    approveComment(input: CommentUpload!): Boolean
    removePhoto(input: ID!): Boolean
    removeComment(input: CommentUpload!): Boolean
    signup(input: UserCredentials!): String
    login(input: UserCredentials!): String
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

      // return json web token
      return jsonwebtoken.sign(
        { id: user._id, dni, nombre: user.nombre, apellido: user.apellido },
        jwtSecret,
        { expiresIn: '1d' }
      )
    },

    async addPhoto (parent, { file, userId, description }, context) {
      const { dni } = await checkIsUserLogged(context)
      const { createReadStream } = await file

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream()

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require('fs').createWriteStream(`../images/${dni}.jpg`)
      stream.pipe(out)
      await finished(out)
      const newPhoto = await photosModel.create({ userId, description })
      return newPhoto
    },

    async addComment (_, { photoId, userId, comment }, context) {
      await checkIsUserLogged(context)
      const newComment = await photosModel.addComment({ id: photoId, userId, comment })
      return newComment
    },

    async approvePhoto (_, { photoId }, context) {
      await checkIsUserLogged(context)
      await photosModel.approvePhoto({ id: photoId })
      return true
    },

    async approveComment (_, { photoId, userId, comment }, context) {
      await checkIsUserLogged(context)
      await photosModel.approveComment({ id: photoId, userId, comment })
      return true
    },

    async removePhoto (_, { photoId, userId }, context) {
      await checkIsUserLogged(context)
      await photosModel.removePhoto({ id: photoId, userId })
      return true
    },

    async removeComment (_, { photoId, userId, comment }, context) {
      await checkIsUserLogged(context)
      await photosModel.removeComment({ id: photoId, userId, comment })
      return true
    }
  },
  Query: {
    async favs (_, __, context) {
      const { email } = await checkIsUserLogged(context)
      const { favs } = userModel.find({ email })
      return photosModel.list({ ids: favs, favs })
    },
    async photo (_, { id }, context) {
      const favs = await tryGetFavsFromUserLogged(context)
      return photosModel.find({ id, favs })
    },
    async photos (_, { approved }, context) {
      const favs = await tryGetFavsFromUserLogged(context)
      return photosModel.list({ approved, favs })
    },
    async topTen (_, __, context) {
      const { _id } = await checkIsUserLogged(context)
      return photosModel.topTen({ userId: _id })
    }
  },
  User: {
    id: (root) => root._id
  },
  Photo: {
    id: (root) => root._id
  }
}

module.exports = { typeDefs, resolvers }
