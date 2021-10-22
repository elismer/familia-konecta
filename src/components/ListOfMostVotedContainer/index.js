
import React from 'react'
import { Wrapper, Title, Item } from './styles'
import { PhotoCard } from '../PhotoCard'

export const ListOfMostVotedContainer = ({ data: { photos = [] } }) => {

  const photoList = photos.length ? photos.slice(0, 3) : []
  return (
    <Wrapper>
      <Title>
        Ranking
      </Title>
      {photoList.map(photo => <Item key={photo.id}>
        <PhotoCard {...photo} />
      </Item>)
      }
    </Wrapper>
  )
}
