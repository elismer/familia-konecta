import { ApprovePhotoMutation } from "../../containers/ApprovePhotoMutation"
import { RemovePhotoMutation } from "../../containers/RemovePhotoMutation"
import { Title, Container, TextArea, Approval, Item, Message, Dislike, Like } from "./styles"
import React from 'react'

export const ApproveComments = ({ data: { photos = [] } }) => {
  const commentsMock = [
    {
      id: 1,
      text: "Este es un comentario Estees un comentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentarioomentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentarioomentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentarioomentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentarioomentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentarioomentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentarioomentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentarioomentario Este es un comentarioEste es un comentarioEste es un comentario Este es un comentario",

    },
    {
      id: 2,
      text: "Este es un comentario",

    },
    {
      id: 3,
      text: "Este es un comentario",

    },
    {
      id: 4,
      text: "Este es un comentario",

    },
    {
      id: 5,
      text: "Este es un comentario",

    },
    {
      id: 6,
      text: "Este es un comentario",

    },
    {
      id: 8,
      text: "Este es un comentario",

    },
    {
      id: 9,
      text: "Este es un comentario",

    },
    {
      id: 10,
      text: "Este es un comentario",

    },
    {
      id: 11,
      text: "Este es un comentario",

    },
    {
      id: 12,
      text: "Este es un comentario",

    },
    {
      id: 13,
      text: "Este es un comentario",

    },
    {
      id: 14,
      text: "Este es un comentario",

    },
    {
      id: 15,
      text: "Este es un comentario",

    },
    {
      id: 16,
      text: "Este es un comentario",

    },
  ]

  return (
    <>
      <Title>
        Comentarios pendientes de aprovación
      </Title>
      <Container>
        {
          commentsMock.length ?
            commentsMock.map(comment => <Item key={comment.id}>
              <TextArea disabled={true}>
                {comment.text}
              </TextArea>
              <Approval>
                <RemovePhotoMutation>
                  {
                    (removePhoto) => {
                      const handleRemove = () => {
                        removePhoto({ variables: { id: photo.id } })
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
            :
            <Message>No hay comentarios para aprobar</Message>
        }

      </Container>
    </>
  )
}
