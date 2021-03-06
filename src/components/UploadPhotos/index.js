import React, { useState } from 'react'
import { AddPhotoMutation } from '../../containers/AddPhotoMutation'
import { ButtonTemplate, Text } from '../ButtonStandard/styles'
import { Content, Wrapper, Button, ButtonContainer, Title, ImgWrapper, Img, InputFile, Subtitle, InputTextArea, Counter, InputConteiner } from './styles'

export const UploadPhotos = () => {
  const [uri, setUri] = useState()
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploaded,setUploaded] = useState(false)
  const buildImgTag = () => {
    let imgTag = null
    if (uri !== null) {
      imgTag = (
        <ImgWrapper>
          <Img className='thumbnail' src={uri} />
        </ImgWrapper>)
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

  const handleChange = ({ target }) => {
    readURI(target)
    setFile(target.files && target.files[0]) 
  }

  const clearImage = () => {
    window.location.reload()
  }


  return (
    <Wrapper>
      <Content>
        <Title>
          Carga de imagen
        </Title>
        <InputConteiner>
          <Subtitle>
            Seleccione una imagen
          </Subtitle>
          <InputFile
            id='upload'
            name='upload'
            label='Elegir archivo'
            type='file'
            onChange={handleChange}
            accept="image/*"
          />
          <Subtitle>
            Ingrese una descripción
          </Subtitle>
          <InputTextArea
            onChange={e => setDescription(e.target.value)}
            value={description}
            maxLength={150}
            cols={40}
            rows={3}
          />
          <Counter value={description.length}>
            {description.length}/150
          </Counter>
        </InputConteiner>

        <ButtonContainer>
          <Button onClick={clearImage}>
            <Text>
              Borrar
            </Text>
          </Button>
          <AddPhotoMutation>
            {addPhoto => {
              const handleUploadClick = () => {
                if (uploaded) return alert('Foto subida')
                setLoading(true)
                addPhoto({ variables: { input: { file, description: description } } }).then((data)=>{
                  setUploaded(true)
                  setLoading(false)
                  alert('Foto subida')
                })
              }
             return (
              loading ? <p>Cargando...</p> : 
              (<ButtonTemplate onClick={handleUploadClick}>
                  <Text>Subir</Text>
              </ButtonTemplate>)
              )
            }
            }
          </AddPhotoMutation>
        </ButtonContainer>
      </Content>
    </Wrapper >
  )
}
