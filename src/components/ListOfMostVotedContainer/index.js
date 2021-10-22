
import React from 'react'
import { Wrapper, Title, Item } from './styles'
import { PhotoCard } from '../PhotoCard'

export const ListOfMostVotedContainer = ({ data: { topTen = [] } }) => {
  const photoList = topTen
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
