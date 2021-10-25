import React from 'react'
import { Router } from '@reach/router'
import { GlobalStyles } from './styles/GlobalStyles'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { NotRegistered } from './pages/NotRegistered'
import Context from './Context'
import { Banner } from './components/Banner'
import TermConditions from './pages/TermsConditions'
import { UploadPhotos } from './components/UploadPhotos'
import { Audit } from './components/Audit'

export default function () {
  return (
    <React.Suspense fallback={<div />}>
      <GlobalStyles />
      <Context.Consumer>
        {
          ({ isAuth, user }) => {
            return (
              isAuth
                ? <>
                  <Banner />
                  <Router>
                    <Home path='/' />
                    <Home path='/pet/:id' />
                    <Detail path='/detail/:id' />
                    <TermConditions path='/ttcc' />
                    {user.isAdmin && <Audit path='/approve' />}
                    <UploadPhotos path='/upload' />
                  </Router>
              </>
                : <Router>
                  <NotRegistered path='/' />
                  <TermConditions path='/ttcc-open' />
                </Router>)
          }
        }
      </Context.Consumer>
    </React.Suspense>
  )
}
