import styled from 'styled-components'
import { fadeIn } from '../../styles/animations'

export const Article = styled.article`
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04),
                0px 4px 25px rgba(0, 0, 0, 0.05),
                0px 3px 6px rgba(0, 0, 0, 0.04);
`

export const ImgWrapper = styled.div`
  border-radius: 10px;
  display: block;
  overflow: hidden;
  padding: 56.25% 0 0 0;
  position: relative;
  width: 100%;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04),
                0px 4px 25px rgba(0, 0, 0, 0.05),
                0px 3px 6px rgba(0, 0, 0, 0.04);
`

export const Img = styled.img`
  ${fadeIn({ time: '2s' })};
  box-shadow: 0 10px 14px rgba(0, 0, 0, .2);
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0px);
`

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`
export const Capitalize = styled.p`
  text-transform: capitalize;
  font-weight: bold;
`

export const Fecha = styled.p`
  font-size: .75rem;
  color: rgba(0,0,0,0.5);
`
