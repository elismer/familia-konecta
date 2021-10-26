import React from 'react'
import { Wrapper } from './styles'

export const Position = ({ value }) => {
  return (
    <Wrapper>
      <h2>Estás en la posición Nº{value}</h2>
    </Wrapper>
  )
}
