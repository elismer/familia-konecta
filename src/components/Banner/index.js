import React from 'react'
import { Logo } from '../Logo'
import { NavBar } from '../NavBar'
import { Wrapper } from './styles'

export const Banner = () => {
  return (
    <Wrapper>
      <Logo />
      <NavBar />
    </Wrapper>
  )
}
