import React from 'react'
import { Link } from '@reach/router'
import { LogoImage } from './styles'

export const Logo = ({ path = "/" }) => (
  <Link to={path}>
    <LogoImage />
  </Link>
)
