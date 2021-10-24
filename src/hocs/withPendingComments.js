import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPendingComments = graphql(gql`
query CommentsAudit {
  commentsAudit{
    id
    src
    likes
    liked
    userId
    pos
    description
    comments {
      comment
      nombre
      apellido
    }
    approved
    nombre
    apellido
  }
}`)
