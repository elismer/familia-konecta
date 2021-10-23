import styled from "styled-components"
import backgroundFull from "../../assets/images/background-full.jpeg"

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-top: 5rem;   
  max-width: 99%;
  background-image: url(${backgroundFull});
  background-size: cover;
  background-position: center center; 
  background-attachment: inherit;
`

export const FavList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 10px;
  padding: 1rem;
`