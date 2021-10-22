import React from 'react'
import { Link, Nav } from './styles'
import { MdHome, MdPersonOutline, MdAdd, MdInfo, MdCheckBox } from 'react-icons/md'
import ReactTooltip from "react-tooltip";

const SIZE = '32px'

export const NavBar = () => {
  return (
    <Nav>
      <Link to='/' data-tip data-for="home"><MdHome size={SIZE} /></Link>
      <Link to='/upload' data-tip data-for="upload"><MdAdd size={SIZE} /></Link>
      <Link to='/detail/:id' data-tip data-for="detail"><MdPersonOutline size={SIZE} /></Link>
      <Link to='/ttcc' data-tip data-for="ttcc"><MdInfo size={SIZE} /></Link>
      <Link to='/approve' data-tip data-for="approve"><MdCheckBox size={SIZE} /></Link>

      <ReactTooltip id="home" place="top" effect="solid">
        Ir a inicio
      </ReactTooltip>
      <ReactTooltip id="upload" place="bottom" effect="solid">
        Subir foto
      </ReactTooltip>
      <ReactTooltip id="detail" place="bottom" effect="solid">
        Ver foto subida
      </ReactTooltip>
      <ReactTooltip id="ttcc" place="bottom" effect="solid">
        Terminos y condiciones
      </ReactTooltip>
      <ReactTooltip id="approve" place="bottom" effect="solid">
        Approvacion de las fotos
      </ReactTooltip>
    </Nav>
  )
}
