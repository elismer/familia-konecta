import React from 'react'
import { Wrapper} from './styles'
import {ListPendingPhotos} from "../../containers/ListPendingPhotos"
import {ListPendingComments} from "../../containers/ListPendingComments"

export const Audit = () => {

  return (
    <Wrapper>
      <ListPendingPhotos/>
      <ListPendingComments/>
    </Wrapper>
  )
}
