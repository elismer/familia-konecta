import React, { useState } from 'react'
import { AddCommentMutation } from '../../containers/AddCommentMutation'
import { TextArea } from './styles'

export const Comment = ({ photoId, close }) => {
  const [value, setValue] = useState('')
  const [prev, setPrev] = useState('')
  return (
    <AddCommentMutation>
      {
        (addComment => {
          const handleSend = (e) => {
            if (e.key === 'Enter' && prev !== 'Shift') {
              addComment({ variables: { input: { comment: value, photoId } } })
              setValue('')
              setPrev('')
              close(false)
            } else setPrev(e.key)
          }
          return (
            <TextArea
              rows={2}
              onKeyDown={handleSend}
              onChange={({ target }) => setValue(target.value)}
              value={value}
            />
          )
        })
      }
    </AddCommentMutation>
  )
}
