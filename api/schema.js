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
    avatar: String
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
    likes: Int
    liked: Boolean
    userId: ID
    description: String
    comments: [Comment]
    approved: Boolean
  }

  type Query {
    favs: [Photo]
    photos(approved: Boolean): [Photo]
    photo(id: ID!): Photo
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

function checkIsUserLogged (context) {
  const { dni, id } = context
  // check if the user is logged
  if (!id) throw new Error('you must be logged in to perform this action')
  // find the user and check if it exists
  const user = userModel.find({ dni })
  // if user doesnt exist, throw an error
  if (!user) throw new Error('user does not exist')
  return user
}

function tryGetFavsFromUserLogged (context) {
  try {
    const { dni } = checkIsUserLogged(context)
    const user = userModel.find({ dni })
    return user.favs
  } catch (e) {
    return []
  }
}

const resolvers = {
  Mutation: {
    likePhoto: (_, { input }, context) => {
      const { id: userId } = checkIsUserLogged(context)

      // find the photo by id and throw an error if it doesn't exist
      const { id: photoId } = input
      const photo = photosModel.find({ id: photoId })
      if (!photo) {
        throw new Error(`Couldn't find photo with id ${photoId}`)
      }

      const hasFav = userModel.hasFav({ id: userId, photoId })

      if (hasFav) {
        photosModel.removeLike({ id: photoId })
        userModel.removeFav({ id: userId, photoId })
      } else {
        // put a like to the photo and add the like to the user database
        photosModel.addLike({ id: photoId })
        userModel.addFav({ id: userId, photoId })
      }

      // get the updated photos model
      const actualPhoto = photosModel.find({ id: photoId })

      return actualPhoto
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
        { id: user.id, dni },
        jwtSecret,
        { expiresIn: '1d' }
      )
    },

    async addPhoto (parent, { file, userId, description }, context) {
      const { dni } = checkIsUserLogged(context)
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
      checkIsUserLogged(context)
      const newComment = await photosModel.addComment({ id: photoId, userId, comment })
      return newComment
    },

    async approvePhoto (_, { photoId }, context) {
      checkIsUserLogged(context)
      await photosModel.approvePhoto({ id: photoId })
      return true
    },

    async approveComment (_, { photoId, userId, comment }, context) {
      checkIsUserLogged(context)
      await photosModel.approveComment({ id: photoId, userId, comment })
      return true
    },

    async removePhoto (_, { photoId, userId }, context) {
      checkIsUserLogged(context)
      await photosModel.removePhoto({ id: photoId, userId })
      return true
    },

    async removeComment (_, { photoId, userId, comment }, context) {
      checkIsUserLogged(context)
      await photosModel.removeComment({ id: photoId, userId, comment })
      return true
    }
  },
  Query: {
    favs (_, __, context) {
      const { email } = checkIsUserLogged(context)
      const { favs } = userModel.find({ email })
      return photosModel.list({ ids: favs, favs })
    },
    photo (_, { id }, context) {
      const favs = tryGetFavsFromUserLogged(context)
      return photosModel.find({ id, favs })
    },
    photos (_, { approved }, context) {
      const favs = tryGetFavsFromUserLogged(context)
      return photosModel.list({ approved, favs })
    }
  }
}

module.exports = { typeDefs, resolvers }
