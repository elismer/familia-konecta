import styled from "styled-components";
import backgroundFull from "../../assets/images/background-full.jpeg"
import backgroundMobile from "../../assets/images/background-mobile.jpeg"


export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: seashell;
    height: 100%;
    width: 100vw;
    background-image: url(${backgroundFull});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center; 
    background-attachment: inherit;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem;
    height: 80%;
    width: 70vw;
    margin: 5rem 0;
    background-color: rgba(255,255,255,0.9);
    border-radius: 1rem;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04), 
                0px 4px 25px rgba(0, 0, 0, 0.05), 
                0px 3px 6px rgba(0, 0, 0, 0.04);
`

export const Title = styled.h1`
    size: 3rem;
    font-weight: bold;
    margin-bottom: 3rem;
    margin-top: 1rem;
`

export const Item = styled.div`
    margin-top: 1rem;
    width: 100%;
`

export const Subtitle = styled.h2`
    size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
`

export const Description = styled.p`
    size: 1rem;
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 1rem;
`