import React from 'react'
import { Link } from '@reach/router'
import { LogoImage } from './styles'

export const Logo = () => (
  <Link to='/'>
    <LogoImage/>
  </Link>
)
