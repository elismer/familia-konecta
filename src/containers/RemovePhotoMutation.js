import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
mutation RemovePhoto($input: PhotoRemove!) {
  removePhoto(input: $input)
}
`

export const RemovePhotoMutation = ({ children }) => {
  return <Mutation mutation={mutation}>{children}</Mutation>
}
