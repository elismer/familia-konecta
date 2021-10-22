import React, { useEffect, useState } from "react"
import { ButtonTemplate, Text } from "../ButtonStandard/styles"
import { Content, Wrapper, Button, ButtonContainer, Title, ImageContainer, Image } from "./styles"

export const UploadPhotos = () => {

    const [uri, setUri] = useState()
    const [preview, setPreview] = useState()


    const buildImgTag = () => {
        let imgTag = null;
        if (uri !== null)
            imgTag = (
                <ImageContainer>
                    <Image className="thumbnail" src={uri}/>
                </ImageContainer>);
        return imgTag;
    }

    const readURI = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (ev) {
                setUri(ev.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleChange = (e) => {
        readURI(e);
    }

    const clearImage = () => {
        window.location.reload();
        console.log(`algo`)
    }

    const sendImage = () => {
        console.log(`preview`, preview)
        console.log(`uri`, uri)
    }

    useEffect(() => {
        setPreview(buildImgTag())
    }, [buildImgTag])

    return (
        <Wrapper>
            <Content>
                <Title>
                    <label
                        htmlFor="upload"
                        className="button">
                        Upload an image
                    </label>
                </Title>

                <input
                    id="upload"
                    type="file"
                    onChange={handleChange}
                    className="show-for-sr" />

                {preview}
                <ButtonContainer>
                    <Button onClick={() => clearImage()}>
                        <Text>
                            Borrar
                        </Text>
                    </Button>
                    <ButtonTemplate onClick={() => sendImage()}>
                        <Text>
                            Subir
                        </Text>
                    </ButtonTemplate>
                </ButtonContainer>

            </Content>
        </Wrapper >
    )
}
