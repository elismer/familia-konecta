import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Div, Title, Subtitle } from './styles'

export const Layout = ({ children, subtitle, title }) => (
  <Fragment>
    <Helmet>
      {title && <title>{title} | Familia Konecta 📷</title>}
      {subtitle && <meta name='description' content={subtitle} />}
    </Helmet>
    <Div>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Div>
  </Fragment>
)
