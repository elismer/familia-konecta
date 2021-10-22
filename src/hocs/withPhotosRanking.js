import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPhotosRanking = graphql(gql`
query getTopTen {
  topTen{
    id
    approved
    src
    likes
    userId
    liked
    pos
  }
}`)
