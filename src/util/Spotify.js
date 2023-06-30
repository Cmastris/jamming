import cid from './secrets';

const clientId = cid;
const redirectURI = "http://localhost:3000/";
let token = null;

const Spotify = {

  getAccessToken() {
    if (token) {
      console.log('Token already set; returning token.');
      return token;
    
    } else {
      // https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow
      console.log('Token not set; attempting to retrieve token from URL.');
      this.getTokenFromURL();

      if (token) {
        console.log('Token retrieved from URL.');
        return token;
      } else {
        console.log('Token not found in URL; authorising user externally.');
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  },

  getTokenFromURL() {
    const url = window.location.href;
    let tokenMatch = url.match(/access_token=([^&]*)/);
    let expiryMatch = url.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiryMatch) {
      this.setAuthData(tokenMatch[1], expiryMatch[1]);
      return token;
    }
    return false;
  },

  setAuthData(URLToken, URLExpiry) {
    token = URLToken;
    window.setTimeout(this.clearAccessToken, Number(URLExpiry)*1000);
    window.history.pushState('Access Token', null, '/');  // Remove auth data from URL
  },

  clearAccessToken() {
    token = null;
    console.log('Token cleared.');
  }
};


export default Spotify;
