import querystring from 'querystring'
import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
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

class ArtistSearch extends React.Component {
  componentDidMount () {
    this.setState({ accessToken: querystring.parse(window.location.hash)['#access_token'] })
  }

  constructor (props) {
    super(props)

    this.state = { value: '', artists: [], accessToken: null }

    this.handleChange = this.handleChange.bind(this)
  }

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
        <Placeholder/>
        <Column>
          <label>
            🔍
            <input type='text' value={this.state.value} onChange={this.handleChange}/>
          </label>
          {this.state.artists.map((artist) =>
            <Button>{artist.name}</Button>
          )}
        </Column>
        <Placeholder/>
      </Row>
    )
  }
}

export default ArtistSearch
