import React from 'react'
import PropTypes from 'prop-types'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { Button } from './styles'

export const FavButton = ({ liked, likes, onClick }) => {
  const Icon = liked ? FaHeart : FaRegHeart

  return (
    <Button onClick={onClick}>
      <Icon size='24px' /> {likes} likes!
    </Button>
  )
}

FavButton.propTypes = {
  liked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}
