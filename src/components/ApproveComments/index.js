import { ApproveCommentMutation } from '../../containers/ApproveCommentMutation'
import { RemoveCommentMutation } from '../../containers/RemoveCommentMutation'
import { Title, Container, TextArea, Approval, Item, Message, Dislike, Like } from './styles'
import React from 'react'

export const ApproveComments = ({ data: { commentsAudit = {} } }) => {
  return (
    <>
      <Title>
        Comentarios pendientes de aprobación
      </Title>
      <Container>
        {
          commentsAudit.length
            ? commentsAudit.map((photo, index) => {console.log(photo);return(<Item key={index}>
              <TextArea disabled>
                {photo.comments.comment}
              </TextArea>
              <Approval>
                <RemoveCommentMutation>
                  {
                    (removeComment) => {
                      const handleRemove = () => {
                        removeComment({ variables: { input: { photoId: photo.id, userId: photo.comments.userId, comment: photo.comments.comment } } })
                      }
                      return (<Dislike onClick={handleRemove} />)
                    }
                  }
                </RemoveCommentMutation>
                <ApproveCommentMutation>
                  {
                    (approveComment) => {
                      const handleApprove = () => {
                        approveComment({ variables: { input: { photoId: photo.id, userId: photo.comments.userId, comment: photo.comments.comment } } })
                      }
                      return (<Like onClick={handleApprove} />)
                    }
                  }
                </ApproveCommentMutation>
              </Approval>
            </Item>)})
            : <Message>No hay comentarios para aprobar</Message>
        }

      </Container>
    </>
  )
}
