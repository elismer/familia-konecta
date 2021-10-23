import React from 'react'
import { Link } from '@reach/router'
import { LogoImage } from './styles'

export const Logo = ({ path = "/", width, height }) => (
  <Link to={path}>
    <LogoImage width={width} height={height} />
  </Link>
)
