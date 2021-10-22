import React, { Fragment } from 'react'
import { useInputValue } from '../../hooks/useInputValue'
import { Error, Form, Input, Title } from './styles'
import { Button } from '../Button'

export const UserForm = ({ disabled, error, title, onSubmit }) => {
  const dni = useInputValue('')
  const password = useInputValue('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ dni: dni.value, password: password.value })
  }

  return (
    <Fragment>
      <Form disabled={disabled} onSubmit={handleSubmit}>
        <Title>{title}</Title>
        <Input placeholder='DNI' {...dni} />
        <Input placeholder='Contraseña' type='password' {...password} />
        <Button>{title}</Button>
      </Form>
      {error && <Error>{error}</Error>}
    </Fragment>
  )
}
