import React, { Fragment } from 'react'
import { ListOfPhotoCards } from '../../containers/ListOfPhotoCards'
import { Helmet } from 'react-helmet'
import { FavList, Wrapper } from './styles'
import { ListOfMostVoted } from '../../containers/ListOfMostVoted'

const HomePage = ({ query }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Familia Konecta</title>
      </Helmet>
      <Wrapper>
        <ListOfPhotoCards query={query} />
        <FavList>
          <ListOfMostVoted />
        </FavList>
      </Wrapper>
    </Fragment>
  )
}

export const Home = React.memo(HomePage, (prevProps, nextProps) => {
  return prevProps.query === nextProps.query
})
