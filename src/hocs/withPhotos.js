import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPhotos = graphql(gql`
query getPhotos($input: FilterQuery!) {
  photos(filter: $input) {
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
}`, { options: props => ({
  variables: {
    input: {
      approved: true,
      query: props.query
    }
  }
})
})
