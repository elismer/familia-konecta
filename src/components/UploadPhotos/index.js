import React, { useEffect, useState } from 'react'
import { AddPhotoMutation } from '../../containers/addPhotoMutation'
import { ButtonTemplate, Text } from '../ButtonStandard/styles'
import { Content, Wrapper, Button, ButtonContainer, Title, ImageContainer, Image } from './styles'

export const UploadPhotos = () => {
  const [uri, setUri] = useState()
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()

  const buildImgTag = () => {
    let imgTag = null
    if (uri !== null) {
      imgTag = (
        <ImageContainer>
          <Image className='thumbnail' src={uri} />
        </ImageContainer>)
    }
    return imgTag
  }

  const readURI = (target) => {
    if (target.files && target.files[0]) {
      let reader = new FileReader()
      reader.onload = function (ev) {
        setUri(ev.target.result)
      }
      reader.readAsDataURL(target.files[0])
    }
  }

  const handleChange = ({target}) => {
    readURI(target)
    setFile(target.files && target.files)
  }

  const clearImage = () => {
    window.location.reload()
    console.log(`algo`)
  }

  useEffect(() => {
    setPreview(buildImgTag())
  }, [buildImgTag])

  return (
    <Wrapper>
      <Content>
        <Title>
          <label
            htmlFor='upload'
            className='button'>
                        Upload an image
          </label>
        </Title>

        <input
          id='upload'
          type='file'
          onChange={handleChange}
          className='show-for-sr' />

        {preview}
        <ButtonContainer>
          <Button onClick={clearImage}>
            <Text>
                            Borrar
            </Text>
          </Button>
          <AddPhotoMutation>
            { addPhoto => {
              const handleUploadClick = () => {
                console.log(file)
                addPhoto({ variables: { input: { file, description:'Lorem ipsum' } } })
              }
              return (
                <ButtonTemplate onClick={handleUploadClick}>
                  <Text>Subir</Text>
                </ButtonTemplate>
              )
            }
            }
          </AddPhotoMutation>
        </ButtonContainer>

      </Content>
    </Wrapper >
  )
}
