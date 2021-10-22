import React, { createContext, useState } from 'react'
export const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.sessionStorage.getItem('token')
  })

  const value = {
    isAuth,
    activateAuth: ({token, userId}) => {
      setIsAuth(true)
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
