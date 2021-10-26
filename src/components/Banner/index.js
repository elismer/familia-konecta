import React, { useState } from 'react'
import { Logo } from '../Logo'
import { NavBar } from '../NavBar'
import { Search } from '../Search'
import { Wrapper } from './styles'

export const Banner = () => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Wrapper>
      <Logo />
      {/* <Search
          searchTerm={searchTerm}
          onChangeInput={(e) => setSearchTerm(e.target.value)}
        /> */}
      <NavBar />
    </Wrapper>
  )
}
