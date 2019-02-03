import React from 'react'
import styled from 'styled-components'
import { ListItem } from '../lib/components'

const Square = styled.img`
  object-fit: cover;
  width:50px;
  height:50px;
`

const ImageContainer = styled.div`
    min-width: 50px;
`

const Button = (props) => (
  <ListItem onClick={props.onClick} className={props.className}>
    <ImageContainer>
      <Square src={props.imgSrc} />
    </ImageContainer>
    <div>{props.label}</div>
  </ListItem>
)

export default Button
