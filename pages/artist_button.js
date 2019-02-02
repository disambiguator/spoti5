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

const imageUrl = artist => (artist.images.length > 0 ? artist.images[0].url : null)

const ArtistButton = (props) => (
  <Button onClick={() => props.onSelect(props.artist)}>
    <ImageContainer>
      <Square src={imageUrl(props.artist)} />
    </ImageContainer>
    <div>{props.artist.name}</div>
  </Button>
)

export default ArtistButton
