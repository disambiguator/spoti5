import querystring from 'querystring'
import axios from 'axios'
import React from 'react'

function extractArtistNames (response) {
  return response.data.artists.items.map((artist) => (artist.name))
}

class ArtistSearch extends React.Component {
  componentDidMount () {
    this.setState({ accessToken: querystring.parse(window.location.hash)['#access_token'] })
  }

  constructor (props) {
    super(props)

    this.state = { value: '', artists: [], accessToken: null }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    axios.get('https://api.spotify.com/v1/search',
      {
        params: {
          type: 'artist',
          q: this.state.value
        },
        headers: {
          'Authorization': 'Bearer ' + this.state.accessToken
        }
      })
      .then((response) => (
        this.setState({ artists: extractArtistNames(response) })
      ))
      .catch((error) => (
        console.log(error)
      ))
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Enter your favorite artist:</p>
        <p>Artists:</p>
        <ul>
          {this.state.artists.map((artist) =>
            <li>{artist}</li>
          )}
        </ul>
        <label>
          Artist:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default ArtistSearch
