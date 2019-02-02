import querystring from 'querystring'
import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import initializeIcons from '../lib/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArtistButton from './artist_button'
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

const App = styled(Row)`
  font-size: 20px;
  font-family: Arial;
`

class ArtistSearch extends React.Component {
  componentDidMount () {
    this.setState({ accessToken: querystring.parse(window.location.hash)['#access_token'] })
  }

  constructor (props) {
    super(props)
    initializeIcons()

    this.state = { value: '', artists: [], accessToken: null }
  }

  onSelect = (artist) => (
    this.setState({ value: artist.name, artists: [] })
  )

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

  render () {
    return (
      <App>
        <Placeholder />
        <Column>
          <ListItem>
            <ArtistSearchInput type='text' value={this.state.value} onChange={this.handleChange} />
            <FontAwesomeIcon icon="search" />
          </ListItem>
          {this.state.artists.map((artist) =>
            <ArtistButton artist={artist} onSelect={this.onSelect} />
          )}
        </Column>
        <Placeholder />
      </App>
    )
  }
}

export default ArtistSearch
