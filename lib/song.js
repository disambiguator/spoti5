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

const Button = styled(ListItem)`
  &:hover {
    border: 2px solid lightgreen;
  }
`

const Song = (props) => (
  <Button>
    <ImageContainer>
      <Square />
    </ImageContainer>
    <div></div>
  </Button>
)

export default Song
