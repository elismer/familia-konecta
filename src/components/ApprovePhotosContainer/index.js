import React from 'react'
import { PhotoCard } from '../PhotoCard'
import { Wrapper, Container, Item, Title, Like, Dislike, Approval } from './styles'

export const ApprovePhotosContainer = ({ data: { photos = [] } }) => {

  const photoList = photos.length ? photos.slice(0, 3) : []

  return (
    <Wrapper>
      <Title>
        Pendientes de aprovacion
      </Title>
      <Container>
        {photoList.map(photo => <Item key={photo.id}>
          <PhotoCard {...photo} />
          <Approval>
            <Dislike />
            <Like />
          </Approval>

        </Item>)
        }
      </Container>
    </Wrapper>
  )
}