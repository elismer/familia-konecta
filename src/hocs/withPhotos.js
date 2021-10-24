import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPhotos = graphql(gql`
query getPhotos {
  photos(approved: true) {
    id
    approved
    src
    likes
    userId
    liked
    nombre
    apellido
    description
    date
    comments{
      comment
      userId
      nombre
      apellido
    }
  }
}`)
