import React from "react";
import { InputIcon, Searcher, Input } from "./styles";
import icon from '../../assets/images/search-icon.svg'

export const Search = ({ searchTerm, onChangeInput}) => {
    return (
        <Searcher >
            <InputIcon src={icon} />
            <Input
                type="text"
                name="search"
                placeholder="Buscar..."
                onChange={onChangeInput}
                value={searchTerm}
            />
        </Searcher>
    )
}