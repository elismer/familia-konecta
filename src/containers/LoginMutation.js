import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const mutation = gql`
mutation login($input: UserCredentials!) {
  login(input: $input){
    token
    userId
  }
}
`

export const LoginMutation = ({ children }) => {
  return <Mutation mutation={mutation}>{children}</Mutation>
}
