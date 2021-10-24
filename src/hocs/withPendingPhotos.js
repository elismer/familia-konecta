import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPendingPhotos = graphql(gql`
query getPhotos {
  photos(approved: false) {
    id
    approved
    src
    likes
    userId
    liked
  }
}`)
