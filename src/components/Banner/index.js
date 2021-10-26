import React from 'react'
import { Logo } from '../Logo'
import { NavBar } from '../NavBar'
import { Search } from '../Search'
import { Wrapper } from './styles'

export const Banner = ({ value, setValue, handleSend, handleClick }) => {
  return (
    <Wrapper>
      <Logo />
      <Search
        searchTerm={value}
        onChangeInput={({ target }) => setValue(target.value)}
        onKeyDown={handleSend}
        onClick={handleClick}
      />
      <NavBar />
    </Wrapper>
  )
}
