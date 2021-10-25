
import React from 'react'
import { Wrapper, Title, Item } from './styles'
import { PhotoCard } from '../PhotoCard'

export const ListOfMostVotedContainer = ({ data: {topTen} }) => {
  const photos = topTen ? topTen.photos : []
  const position = topTen ? topTen.position : null
  return (
    <Wrapper>
      <Title>
        Ranking
      </Title>
      {photos.map(photo => <Item key={photo.id}>
        <PhotoCard {...photo} />
      </Item>)
      }
    </Wrapper>
  )
}
