
import React from 'react'
import { ApprovePhotoMutation } from '../../containers/ApprovePhotoMutation'
import { RemovePhotoMutation } from '../../containers/RemovePhotoMutation'
import { PhotoCard } from '../PhotoCard'
import { Title, Container, Approval, Item, Message, Like, Dislike } from './styles'

export const ApprovePhotos = ({ data: { photos = [] } }) => {
  return (
    <>
      <Title>
        Fotos pendientes de aprobación
      </Title>
      <Container>
        {
          photos.length
            ? photos.map(photo => <Item key={photo.id}>
              <PhotoCard {...photo} />
              <Approval>
                <RemovePhotoMutation>
                  {
                    (removePhoto) => {
                      const handleRemove = () => {
                        removePhoto({ variables: {input:{ photoId: photo.id, userId: photo.userId }} })
                      }
                      return (<Dislike onClick={handleRemove} />)
                    }
                  }
                </RemovePhotoMutation>
                <ApprovePhotoMutation>
                  {
                    (approvePhoto) => {
                      const handleApprove = () => {
                        approvePhoto({ variables: { id: photo.id } })
                      }
                      return (<Like onClick={handleApprove} />)
                    }
                  }
                </ApprovePhotoMutation>
              </Approval>
            </Item>)
            : <Message>No hay publicaciones para aprobar</Message>
        }
      </Container>
    </>
  )
}
