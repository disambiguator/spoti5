import querystring from 'querystring'
import React from 'react'
import styled from 'styled-components'
import initializeIcons from '../lib/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArtistButton from '../lib/artist_button'
import Track from '../lib/track'
import { ListItem, Row } from '../lib/components'
import Spotify from '../lib/spotify'

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
    this.spotify = new Spotify({ accessToken: querystring.parse(window.location.hash)['#access_token'] })
  }

  constructor (props) {
    super(props)
    initializeIcons()

    this.state = {
      value: '',
      artists: [],
      tracks: [],
      selectedArtist: null
    }
  }

  onSelect = (artist) => {
    this.setState({
      value: artist.name,
      artists: [],
      selectedArtist: artist
    })

    this.spotify.getTracks({ artist: artist })
      .then((response) => (
        this.setState({ tracks: response.data.tracks })
      ))
  }

  handleChange = event => {
    let artist = event.target.value
    this.setState({ value: artist })

    this.spotify.searchArtists({ artist: artist })
      .then((response) => (
        this.setState({ artists: response.data.artists.items })
      ))
  }

  searchBox = () => (
    this.state.selectedArtist ? <ArtistButton artist={this.state.selectedArtist} onSelect={this.onSelect} /> :
      <ListItem>
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
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
          </Songs>
          <Column>
            <p>Song Search</p>
            {this.state.tracks.map((track) =>
              <Track track={track} />
            )}
          </Column>
        </Row>
      </App>
    )
  }
}

export default ArtistSearch
