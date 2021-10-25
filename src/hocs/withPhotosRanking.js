import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPhotosRanking = graphql(gql`
query getTopTen {
  topTen{
    photos{
      likes
      liked
      date
      src
    }
    position
  }
}`)
