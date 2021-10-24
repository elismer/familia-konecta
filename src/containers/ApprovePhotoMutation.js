import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
mutation ApprovePhoto($id: ID!) {
  approvePhoto(input: $id)
}
`

export const ApprovePhotoMutation = ({ children }) => {
  return <Mutation mutation={mutation}>{children}</Mutation>
}
