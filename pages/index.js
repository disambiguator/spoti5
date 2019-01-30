import querystring from 'querystring'

const spotify_params = {
  client_id: process.env.SPOTIFY_CLIENT_ID,
  redirect_uri: `${process.env.BASE_URI}/artist_search`,
  response_type: 'token'
};
const SPOTIFY_AUTHORIZE_URL = `https://accounts.spotify.com/authorize?${querystring.stringify(spotify_params)}`;

export default () => (
  <div>
    <h1>Spoti5</h1>
    <p>Welcome!</p>
    <a href={SPOTIFY_AUTHORIZE_URL}>First, please log in to Spotify.</a>
  </div>
)
