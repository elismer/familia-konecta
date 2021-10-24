import styled from "styled-components";
import dislike from "../../assets/images/dislike.svg"
import like from "../../assets/images/like.svg"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  height: 100%;
  width: 100vw;
  margin-top: 5rem;
  background-color: seashell;
`

export const Container = styled.div`
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  gap: 1rem;
  overflow-y: scroll;
  min-height: 25rem;
`

export const Title = styled.h1`
  size: 2rem;
  font-family: sans-serif;
  font-weight: bold;
  color: #000000;
  margin-top: 2rem;
  padding: 1rem;
  background: #440891;
  background: -webkit-linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
  background: -moz-linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
  background: linear-gradient(to bottom right, #440891 0%, #CF59C7 64%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const Message = styled.h2`
  align-self: center;
  size: 1.5rem;
  font-family: sans-serif;
  font-weight: bold;
  color: rgba(0,0,0, 0.5);
  margin-top: 2rem;
  padding: 1rem;
`

export const TextArea = styled.textarea`
  font-family: sans-serif;
  box-sizing: border-box;
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 12px;
  line-height: 24px;
  overflow: auto;
  height: auto;
  padding: 8px;
  box-shadow: 0 0 7px 0 rgba(0,0,0, .3);
  height: 100%;
  width: 100%;
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 2rem;
  min-width: 20rem;
  height: 20rem;
  border-radius: 1rem;
  background-color: rgba(255,255,255,.7);
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04), 
                0px 4px 25px rgba(0, 0, 0, 0.05), 
                0px 3px 6px rgba(0, 0, 0, 0.04);
`

export const Approval = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
`

export const Like = styled.img.attrs(() => ({
  src: like
}))`
  width: 100%;
  height: 100%;
  max-height: 4rem;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
`

export const Dislike = styled.img.attrs(() => ({
  src: dislike
  }))`
  width: 100%;
  height: 100%;
  max-height: 4rem;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
`

