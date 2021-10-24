import React from 'react'
import { FaComment, FaRegComment } from 'react-icons/fa'
import { Button } from './styles'

export const CommentsIcon = ({ state, setState }) => {
  const Icon = state ? FaComment : FaRegComment
  return (
    <Button onClick={() => setState(prev => !prev)}>
      <Icon size='24px' />
    </Button>
  )
}
