import React from 'react'
import { InputIcon, Searcher, Input } from './styles'
import icon from '../../assets/images/search-icon.svg'

export const Search = ({ searchTerm, onChangeInput, onKeyDown, onClick }) => {
  return (
    <Searcher >
      <Input
        type='text'
        name='search'
        placeholder='Encontrame 👪'
        onChange={onChangeInput}
        value={searchTerm}
        onKeyDown={onKeyDown}
      />
      <InputIcon src={icon} onClick={onClick} />
    </Searcher>
  )
}
