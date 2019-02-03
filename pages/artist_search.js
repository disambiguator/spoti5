import querystring from 'querystring'
import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import initializeIcons from '../lib/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArtistButton from '../lib/artist_button'
import Song from '../lib/song'
import { ListItem, Row } from '../lib/components'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 2;
`

const Placeholder = styled.div`
  flex: 1;
`

const ArtistSearchInput = styled.input`
  font-size: 20px;
  font-family: Arial;
  text-align: right;
  flex: 10;
`

const App = styled.div`
  font-size: 20px;
  font-family: Arial;
`

const StartButton = styled.button`
  background: OliveDrab;
  color: white;
  font-size: 20px;
`

const times = x => f => {
  if (x > 0) {
    f()
    times(x - 1)(f)
  }
}

const Songs = styled(Column)`
  padding-top: 50px
`

class ArtistSearch extends React.Component {
  componentDidMount () {
    this.setState({ accessToken: querystring.parse(window.location.hash)['#access_token'] })
  }

  constructor (props) {
    super(props)
    initializeIcons()

    this.state = {
      value: '',
      artists: [],
      tracks: [],
      accessToken: null,
      selectedArtist: null
    }
  }

  onSelect = (artist) => {
    this.setState({
      value: artist.name,
      artists: [],
      selectedArtist: artist
    })

    const artistUrl = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`

    axios.get(artistUrl,
      {
        params: {
          market: 'from_token'
        },
        headers: {
          'Authorization': 'Bearer ' + this.state.accessToken
        }
      })
      .then((response) => (
        this.setState({ tracks: response.data.tracks })
      ))
      .catch((error) => (
        console.log(error)
      ))
  }

  handleChange = event => {
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

  searchBox = () => (
    this.state.selectedArtist ? <ArtistButton artist={this.state.selectedArtist} onSelect={this.onSelect} /> : <ListItem>
      <ArtistSearchInput type='text' value={this.state.value} onChange={this.handleChange} />
      <FontAwesomeIcon icon='search' />
    </ListItem>
  )

  render () {
    return (
      <App>
        <Row>
          <Placeholder />
          <Column>
            {this.searchBox()}
            {this.state.artists.map((artist) =>
              <ArtistButton artist={artist} onSelect={this.onSelect} />
            )}
            {this.state.selectedArtist ? <StartButton>Let's Go!</StartButton> : null}
          </Column>
          <Placeholder />
        </Row>
        <Row>
          <Songs>
            <p>Pop 5</p>
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
          </Songs>
          <Column>
            <p>Song Search</p>
            {this.state.tracks.map((song) =>
              <Song song={song} />
            )}
          </Column>
        </Row>
      </App>
    )
  }
}

export default ArtistSearch
