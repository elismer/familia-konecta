import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPendingPhotos = graphql(gql`
query getPhotos($input: FilterPhotos) {
  photos(filter: $input) {
    id
    approved
    description
    src
    likes
    userId
    nombre
    apellido
    liked
  }
}`)
