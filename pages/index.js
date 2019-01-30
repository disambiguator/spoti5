import querystring from 'querystring'
import axios from 'axios'

const spotify_params = {
  client_id: process.env.SPOTIFY_CLIENT_ID,
  redirect_uri: process.env.BASE_URI,
  response_type: 'token'
};
const query_params = querystring.stringify(spotify_params);
const SPOTIFY_AUTHORIZE_URL = `https://accounts.spotify.com/authorize?${query_params}`;

function extractArtistNames(response) {
  return response.data.artists.items.map((artist) => (artist.name))
}

class ArtistForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: '', artists: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get('https://api.spotify.com/v1/search',
      {
        params: {
          type: 'artist',
          q: this.state.value
        },
        headers: {
          'Authorization': 'Bearer ' + this.props.accessToken
        }
      })
      .then((response) => (
        this.setState({artists: extractArtistNames(response)})
      ))
      .catch((error) => (
        console.log(error)
      ))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Artists:</p>
        <ul>
          {this.state.artists.map((artist) =>
            <li>{artist}</li>
          )}
        </ul>
        <label>
          Artist:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {accessToken: null}
  }

  componentDidMount() {
    this.setState({accessToken: querystring.parse(window.location.hash)['#access_token']});
  }

  render() {
    return (
      <div>
        <a href={SPOTIFY_AUTHORIZE_URL}>First, please log in to Spotify.</a>

        <p>Enter your favorite artist:</p>
        <ArtistForm accessToken={this.state.accessToken}/>
      </div>
    )
  }
}

export default () => (
  <IndexPage/>
)
