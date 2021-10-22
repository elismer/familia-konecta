import React from 'react'
import { Router } from '@reach/router'
import { GlobalStyles } from './styles/GlobalStyles'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { NotRegistered } from './pages/NotRegistered'
import Context from './Context'
import { Banner } from './components/Banner'
import TermConditions from './pages/TermsConditions'

export default function () {
  return (
    <React.Suspense fallback={<div />}>
      <GlobalStyles />

      <Context.Consumer>
        {
          ({ isAuth }) =>
            isAuth
              ?
              <>
                <Banner />
                <Router>
                  <Home path='/' />
                  <Home path='/pet/:id' />
                  <Detail path='/detail/:id' />
                  <TermConditions path='/ttcc' />
                </Router>
              </>
              : <Router>
                <NotRegistered path='/' />
              </Router>
        }
      </Context.Consumer>
    </React.Suspense>
  )
}
