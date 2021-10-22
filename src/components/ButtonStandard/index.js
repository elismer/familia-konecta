import { ButtonTemplate, Text } from "./styles"
import React from 'react'
import { Link } from '@reach/router'

const ButtonStandard = ({ text, route }) => {


    return (
        <Link to={route}>
            <ButtonTemplate>
                <Text>
                    {text}
                </Text>
            </ButtonTemplate>
        </Link>
    )
}

export default ButtonStandard