const express = require('express')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload')
const { resolvers, typeDefs } = require('./schema')
const jwt = require('express-jwt')
const path = require('path')
// this is not secure! this is for dev purposes
process.env.JWT_SECRET = process.env.JWT_SECRET || 'somereallylongsecretkey'

const PORT = process.env.PORT || 3500
const app = express()

app.use(cors())

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})


const server = new ApolloServer({
  introspection: true, // do this only for dev purposes
  playground: true, // do this only for dev purposes
  uploads: false,
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { dni, nombre, id, apellido, isAdmin, hasPhoto } = req.user || {}
    return { dni, nombre, id, apellido, isAdmin, hasPhoto }
  }
})

app.use(auth)

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  const { status } = err
  res.status(status).json(err)
}
app.use(errorHandler)
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }))
server.applyMiddleware({ app,
  path: '/graphql',
  bodyParserConfig: {
    limit: '10mb'
  }
})

app.use('/image', express.static(path.join(__dirname, '/images')))

if (!process.env.NOW_REGION) {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/graphql`)
  })
}

module.exports = app
