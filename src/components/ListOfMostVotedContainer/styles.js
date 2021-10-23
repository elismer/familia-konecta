import styled from "styled-components";

export const Wrapper = styled.div`
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-height: 100%;
    gap: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04), 
                0px 4px 25px rgba(0, 0, 0, 0.05), 
                0px 3px 6px rgba(0, 0, 0, 0.04);
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
`

export const Item = styled.div`
  padding-bottom: 2rem;
  width: 75%;
  height: 100%;
`
