import React, { Fragment } from 'react'
import { ListOfPhotoCards } from '../../containers/ListOfPhotoCards'
import { Helmet } from 'react-helmet'
import { FavList, Wrapper } from './styles'

const HomePage = ({ id }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Familia Konecta</title>
      </Helmet>
      <Wrapper>
        <ListOfPhotoCards categoryId={id} />
        <FavList>
          <h1> list here!</h1>
        </FavList>
      </Wrapper>
    </Fragment>
  )
}

export const Home = React.memo(HomePage, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
})
