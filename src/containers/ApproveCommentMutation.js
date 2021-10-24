import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
mutation ApproveComment($input: CommentUpload!) {
  approveComment(input: $input)
}
`

export const ApproveCommentMutation = ({ children }) => {
  return <Mutation mutation={mutation}>{children}</Mutation>
}
