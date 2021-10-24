import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
mutation likePhoto($input: CommentUpload!) {
  addComment(input: $input) {
    comment,
    userId
  }
}
`

export const AddCommentMutation = ({ children }) => {
  return <Mutation mutation={mutation}>{children}</Mutation>
}
