import React from 'react'
import { Logo } from '../Logo'
import { NavBar } from '../NavBar'
import { Wrapper } from './styles'

export const Banner = ({ value, setValue, handleSend }) => {
  return (
    <Wrapper>
      <Logo />
      <input value={value} onChange={({ target }) => setValue(target.value)} onKeyDown={handleSend} placeholder='Encontrame 👪' />
      <NavBar />
    </Wrapper>
  )
}
