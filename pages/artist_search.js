import querystring from 'querystring'
import axios from 'axios'
import React from 'react'

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
      <div>
        <label>
          Search for an artist:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <ul>
          {this.state.artists.map((artist) =>
            <li>{artist.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default ArtistSearch
