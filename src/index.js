import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from "apollo-link-context";
import Context from './Context'
import App from './App'

const link = createUploadLink({ uri: "http://localhost:3500/graphql"})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(link),
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
