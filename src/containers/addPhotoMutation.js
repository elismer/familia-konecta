import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
mutation UploadPhoto($input: PhotoUpload!) {
  addPhoto(input: $input) {
    src,
    liked,
    likes,
    userId
  }
}
`

export const AddPhotoMutation = ({ children }) => {
  return <Mutation mutation={mutation}>{children}</Mutation>
}
