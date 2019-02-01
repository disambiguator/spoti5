import React from 'react'
import styled from 'styled-components'

const Square = styled.img`
  object-fit: cover;
  width:75px;
  height:75px;
`

const ImageContainer = styled.span`
    min-height: 75px;
    min-width: 75px;
    display: inline-block;
`

const Button = styled.div`
  background: transparent;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid white;

  &:hover {
    border: 2px solid black;
  }
`

class ArtistButton extends React.Component {
  selectArtist = () => {
    this.props.onSelect(this.props.artist)
  }

  imageUrl = artist => (artist.images.length > 0 ? artist.images[0].url : null)

  render = () => (
    <Button onClick={this.selectArtist}>
      <ImageContainer>
        <Square src={this.imageUrl(this.props.artist)} />
      </ImageContainer>
      <span>{this.props.artist.name}</span>
    </Button>
  )
}

export default ArtistButton
