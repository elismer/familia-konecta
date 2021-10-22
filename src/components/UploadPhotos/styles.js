import styled from "styled-components"
import backgroundFull from "../../assets/images/background-full.jpeg"

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: seashell;
    height: 100vh;
    width: 100vw;
    margin-top: 5rem;
    background-image: url(${backgroundFull});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center; 
    background-attachment: inherit;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    height: 80%;
    width: 50vw;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04), 
                0px 4px 25px rgba(0, 0, 0, 0.05), 
                0px 3px 6px rgba(0, 0, 0, 0.04);
`

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  background: blue ;
  border-radius: .5rem;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 30px;
  background: red;
  border: none;
  min-width: 40%;
  color: #000000;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`


export const Title = styled.h1`
    size: 2rem;
    font-family: sans-serif;
    font-weight: bold;
    background: #440891;
    background: -webkit-linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
    background: -moz-linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
    background: linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
`

export const ImageContainer = styled.div`
  max-width: 100%;
  max-height: 50vh;
`

export const Image = styled.img`
  margin-top: 1rem;
  margin-bottom: 1rem;
  max-width: 100%;
  max-height: 90%;
`