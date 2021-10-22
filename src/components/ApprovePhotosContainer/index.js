import React from 'react'
import { RemovePhotoMutation } from '../../containers/RemovePhotoMutation'
import { ApprovePhotoMutation } from '../../containers/ApprovePhotoMutation'
import { PhotoCard } from '../PhotoCard'
import { Wrapper, Container, Item, Title, Like, Dislike, Approval } from './styles'

export const ApprovePhotosContainer = ({ data: { photos = [] } }) => {

  return (
    <Wrapper>
      <Title>
        Pendientes de aprovacion
      </Title>
      <Container>
        {photos.map(photo => <Item key={photo.id}>
          <PhotoCard {...photo} />
          <Approval>
            <RemovePhotoMutation>
              {
                (removePhoto) => {
                  const handleRemove = ()=>{
                    removePhoto({variables: { id: photo.id }})
                  }
                  return(<Dislike onClick={handleRemove}/>)

                }
              }
            </RemovePhotoMutation>
            <ApprovePhotoMutation>
              {
                (approvePhoto) => {
                  const handleApprove = ()=>{
                    approvePhoto({variables: { id: photo.id }})
                  }
                  return(<Like onClick={handleApprove}/>)
                }
              }
            </ApprovePhotoMutation>
          </Approval>
        </Item>)
        }
      </Container>
    </Wrapper>
  )
}
