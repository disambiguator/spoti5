import querystring from 'querystring'
import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import initializeIcons from '../lib/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Square = styled.img`
  object-fit: cover;
  width:75px;
  height:75px;
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

const Row = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 3;
`

const Placeholder = styled.div`
  flex: 1;
`

class ArtistButton extends React.Component {
  selectArtist = () => {
    this.props.onSelect(this.props.artist)
  }

  render = () => (
    <Button onClick={this.selectArtist}>
      <Square src={this.props.artist.images[0].url} />
      <span>{this.props.artist.name}</span>
    </Button>
  )
}

class ArtistSearch extends React.Component {
  componentDidMount () {
    this.setState({ accessToken: querystring.parse(window.location.hash)['#access_token'] })
  }

  constructor (props) {
    super(props)
    initializeIcons()

    this.state = { value: '', artists: [], accessToken: null }

    this.handleChange = this.handleChange.bind(this)
  }

  onSelect = (artist) => (
    this.setState({ value: artist.name, artists: [] })
  )

  handleChange (event) {
    let artist = event.target.value
    this.setState({ value: artist })
    axios.get('https://api.spotify.com/v1/search',
      {
        params: {
          type: 'artist',
          q: artist
        },
        headers: {
          'Authorization': 'Bearer ' + this.state.accessToken
        }
      })
      .then((response) => (
        this.setState({ artists: response.data.artists.items })
      ))
      .catch((error) => (
        console.log(error)
      ))
  }

  render () {
    return (
      <Row>
        <Placeholder />
        <Column>
          <label>
            <FontAwesomeIcon icon="search" />
            <input type='text' value={this.state.value} onChange={this.handleChange} />
          </label>
          {this.state.artists.map((artist) =>
            <ArtistButton artist={artist} onSelect={this.onSelect} />
          )}
        </Column>
        <Placeholder />
      </Row>
    )
  }
}

export default ArtistSearch
