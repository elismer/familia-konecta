import React, { useContext } from 'react'
import { Context } from '../../Context'
import { UserForm } from '../../components/UserForm'
import { LoginMutation } from '../../containers/LoginMutation'
import { Layout } from '../../components/Layout'
import { Wrapper, Content, Fields } from "./styles"
import { Logo } from '../../components/Logo'

export const NotRegistered = () => {
  const { activateAuth } = useContext(Context)

  return (
    <Wrapper>
      <Content>
        <Logo path="#"/>
        <Fields>
          <LoginMutation>
            {(login, { loading, error }) => {
              const handleSubmit = ({ dni, password }) => {
                const input = { dni: +dni, password: +password }
                login({ variables: { input } }).then(({ data }) => activateAuth(data.login))
              }
              const errorMsg = error && 'No se puede iniciar sesión. El usuario no existe o el password no es correcto.'
              return <UserForm disabled={loading} error={errorMsg} title='Iniciar sesión' onSubmit={handleSubmit} />
            }}
          </LoginMutation>
        </Fields>
      </Content>
    </Wrapper>
  )
}
