import styled from 'styled-components'

export const List = styled.ul`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(16rem,1fr));
  justify-items: center;
  gap: 1rem;
`

export const Item = styled.li`
  padding-bottom: 2rem;
  width: 100%;
  height: 100%;
`
