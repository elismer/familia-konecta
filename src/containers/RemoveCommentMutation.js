import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
mutation RemoveComment($input: CommentUpload!) {
  removeComment(input: $input)
}
`

export const RemoveCommentMutation = ({ children }) => {
  return <Mutation mutation={mutation}>{children}</Mutation>
}
