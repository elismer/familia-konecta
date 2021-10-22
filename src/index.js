import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Context from './Context'
import App from './App'

const token = window.sessionStorage.getItem('token')
const link = createUploadLink({ uri: "http://localhost:3500/graphql", headers:{Authorization:`Bearer ${token}`}})
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  request: (operation) => {
    const authorization = token ? `Bearer ${token}` : ''
    operation.setContext({
      headers: {
        authorization
      }
    })
  }
})

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById('app')
)
