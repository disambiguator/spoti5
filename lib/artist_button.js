import React from 'react'
import styled from 'styled-components'
import Button from './button'

const ButtonWithHover = styled(Button)`
  &:hover {
    border: 2px solid lightgreen;
  }
`

const imageUrl = artist => (artist.images.length > 0 ? artist.images[0].url : null)

const ArtistButton = (props) => (
  <ButtonWithHover className={props.className}
    onClick={() => props.onSelect(props.artist)}
    imgSrc={imageUrl(props.artist)}
    label={props.artist.name}
  />
)

export default ArtistButton
