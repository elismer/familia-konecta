import styled from "styled-components"

import backgroundLoginFull from "../../assets/images/login-full.png"

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: seashell;
    height: 100vh;
    width: 100vw;
    background-image: url(${backgroundLoginFull});
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
    height: 50%;
    width: 50vw;
    border-radius: 1rem;
    background-color: rgba(255,255,255,0.9);
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04), 
                0px 4px 25px rgba(0, 0, 0, 0.05), 
                0px 3px 6px rgba(0, 0, 0, 0.04);
`

export const Fields = styled.div`
    padding: 1rem;
    width: 100%;
`