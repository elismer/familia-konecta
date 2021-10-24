import jwtDecode from 'jwt-decode'
import React, { createContext, useState } from 'react'
export const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.sessionStorage.getItem('token')
  })
  const [user, setUser] = useState(() => {
    const token = window.sessionStorage.getItem('token')
    return token ? jwtDecode(token) : {}
  })

  const value = {
    isAuth,
    user,
    activateAuth: ({ token, userId }) => {
      setIsAuth(true)
      setUser(jwtDecode(token))
      window.sessionStorage.setItem('userId', userId)
      window.sessionStorage.setItem('token', token)
    },

    removeAuth: () => {
      setIsAuth(false)
      window.sessionStorage.removeItem('userId')
      window.sessionStorage.removeItem('token')
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}
