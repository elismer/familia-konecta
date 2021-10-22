import styled from "styled-components";


export const ButtonTemplate = styled.button`
    display: flex;
    flex-direction: row;
    align-self: center;
    gap: 1fr;
    align-items: center;
    padding: .5rem 1rem;
    min-width: min(34rem, 95%);
    height: 2.5rem;
    background: blue ;
    border-radius: .5rem;
    margin: 1rem;
    padding: 20px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 30px;
    border: none;
    background: linear-gradient(90deg, hsla(231, 75%, 63%, 1), hsla(331, 75%, 63%, 1));
    border: none;
    color: #000000;
`

export const Text = styled.span`
    display: flex;
    cursor: pointer;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 2rem;
    text-align: center;
    color: #FFFFFF;
    text-decoration: none;
`