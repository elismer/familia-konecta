import styled from 'styled-components'
import logo from '../../assets/logo.svg' 


export const LogoImage = styled.img.attrs(() => ({
  src: logo
}))`
  width: ${props => props.width? props.width :"10rem"};
  height: ${props => props.height? props.height :"5rem"};;
`