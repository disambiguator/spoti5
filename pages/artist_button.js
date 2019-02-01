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
      <div>{this.props.artist.name}</div>
    </Button>
  )
}

export default ArtistButton
