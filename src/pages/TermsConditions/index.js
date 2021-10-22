
import React from 'react'
import termConditions from '../../assets/ttcc/termConditions'
import ButtonStandard from '../../components/ButtonStandard'
import { Content, Wrapper, Title, Subtitle, Description, Item } from './styles'

export const TermConditions = () => {


  return (
    <Wrapper>
      <Content>
        <Title>Bases y condiciones</Title>
        {
          termConditions.map((term, index) =>
            <Item key={index}>
              <Subtitle>{term.subtitle}</Subtitle>
              <Description>{term.description}</Description>
            </Item>)
        }

        <ButtonStandard
          text="Acepto los terminos"
          route="/"
        >
        </ButtonStandard>
      </Content>
    </Wrapper>
  )
}

export default TermConditions
