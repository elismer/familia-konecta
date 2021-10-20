import React, { Fragment } from 'react'
import { List, Item, FavList, Wrapper } from './styles'
import { PhotoCard } from '../PhotoCard'

export const ListOfPhotoCardsComponent = ({ data: { photos = [] } }) => {
  return (
      <List>
        {photos.map(photo => <Item key={photo.id}>
                                <PhotoCard {...photo} />
                              </Item>)
        }
      </List>

  )
}
