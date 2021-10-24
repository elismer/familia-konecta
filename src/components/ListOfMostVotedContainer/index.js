
import React from 'react'
import { Wrapper, Title, Item } from './styles'
import { PhotoCard } from '../PhotoCard'
import { Position } from '../Position'

export const ListOfMostVotedContainer = ({ data: { topTen = [] } }) => {
  const photoList = topTen

  // const lastElement = () => {
  //   const index = photoList.findIndex(item => item.userId == "616f62f6a4aacec423591f47")//window.sessionStorage.getItem("userId")) 
  //   const finalIndex = index > 0 ? index : 0
  //   console.log(`finalIndex`, finalIndex , index, window.sessionStorage.getItem("userId"))
  //   console.log(`photoList`, photoList)
  //   return photoList[finalIndex]
  // }

  return (
    <Wrapper>
      <Title>
        Ranking
      </Title>
      {photoList.map(photo => <Item key={photo.id}>
        <PhotoCard {...photo} />
      </Item>)
      }
      <Position value={ 12 } />
    </Wrapper>
  )
}
