import React from 'react'
import { Link, Nav } from './styles'
import { MdHome, MdPersonOutline, MdAdd, MdInfo, MdCheckBox } from 'react-icons/md'
import ReactTooltip from 'react-tooltip'
import Context from '../../Context'
const SIZE = '32px'

export const NavBar = () => {
  return (
    <Context.Consumer>
      {({ user }) => (
        <Nav>
          <Link to='/' data-tip data-for='home'><MdHome size={SIZE} /></Link>
          {!user.hasPhoto && <Link to='/upload' data-tip data-for='upload'><MdAdd size={SIZE} /></Link>}
          <Link to='/ttcc' data-tip data-for='ttcc'><MdInfo size={SIZE} /></Link>
          {user.isAdmin && <Link to='/approve' data-tip data-for='approve'><MdCheckBox size={SIZE} /></Link>}

          <ReactTooltip id='home' place='top' effect='solid'>
            Ir a inicio
          </ReactTooltip>
          {!user.hasPhoto &&
            (<ReactTooltip id='upload' place='bottom' effect='solid'>
            Subir foto
            </ReactTooltip>)}
          <ReactTooltip id='ttcc' place='bottom' effect='solid'>
            Terminos y condiciones
          </ReactTooltip>
          {user.isAdmin &&
            (<ReactTooltip id='approve' place='bottom' effect='solid'>
            Aprobación de las fotos
            </ReactTooltip>)}
        </Nav>
      )
      }
    </Context.Consumer>
  )
}
