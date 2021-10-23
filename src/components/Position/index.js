import React from "react"
import { Wrapper } from "./styles"

export const Position = ({ value }) => {
    return (
        <Wrapper>
            <h2>Estas en la posición Nº{value}</h2>
        </Wrapper>
    )
}