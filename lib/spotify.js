import axios from 'axios'

export default class Spotify {
  constructor ({ accessToken }) {
    this.accessToken = accessToken
  }

  getTracks ({ artist }) {
    const artistUrl = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`

    return axios.get(artistUrl,
      {
        params: {
          market: 'from_token'
        },
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      })
      .catch((error) => (
        console.log(error)
      ))
  }

  searchArtists ({ artist }) {
    return axios.get('https://api.spotify.com/v1/search',
      {
        params: {
          type: 'artist',
          q: artist
        },
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      })
      .catch((error) => (
        console.log(error)
      ))
  }
}
