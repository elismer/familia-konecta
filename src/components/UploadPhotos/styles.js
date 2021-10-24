import styled from "styled-components"
import backgroundFull from "../../assets/images/background-full.jpeg"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: seashell;
  min-height: 100vh;
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
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
  min-height: 80%;
  max-height: 100vh;
  width: 50vw;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04), 
              0px 4px 25px rgba(0, 0, 0, 0.05), 
              0px 3px 6px rgba(0, 0, 0, 0.04);
`

export const InputConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 70%;
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
  cursor: pointer;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`

export const Title = styled.h1`
    font-size: 3rem;
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

export const Subtitle = styled.h2`
    font-size: 1.5rem;
    font-family: sans-serif;
    font-weight: bold;
    background: #440891;
    margin: 0 0 2rem 0;
    background: -webkit-linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
    background: -moz-linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
    background: linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export const ImageContainer = styled.div`
  width: 20%;
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
`

export const Image = styled.img`
  margin-top: 1rem;
  margin-bottom: 1rem;
  max-width: 100%;
  max-height: 100%;
`

export const InputFile = styled.input.attrs({ type: 'file' })`
  &:active {
    background-color: #f1ac15;
  }
    ::-webkit-file-upload-button:hover {
    background: #fff;
    border: 2px solid #535353;
    color: #000;
  }
  ::-webkit-file-upload-button {
    background: #ED1C1B;
    border: 2px solid #ED1C1B;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    outline: none;
    padding: 10px 25px;
    text-transform: uppercase;
    transition: all 1s ease;
  }
`

export const InputTextArea = styled.textarea`
  font-family: sans-serif;
  box-sizing: border-box;
	border: none;
	border-radius: 3px;
	resize: none;
	font-size: 20px;
	line-height: 24px;
	overflow: auto;
	height: auto;
	padding: 8px;
	box-shadow: 0 0 7px 0 rgba(0,0,0, .3);
  height: 10%;
  width: 100%;
`
export const Counter = styled.p`
  font-size: .75rem;
  color: ${props => props.value < 150 ? 'rgba(0,0,0,0.3) ': 'red'};
`