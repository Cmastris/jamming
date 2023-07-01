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
  },

  async search(term) {
    // https://developer.spotify.com/documentation/web-api/concepts/api-calls
    // https://developer.spotify.com/documentation/web-api/reference/search
    
    let auth = this.getAccessToken();
    if (!auth) {
      console.log("Not authenticated; won't search.");
      return [];
    }

    if (term.length < 1) {
      console.log("Search term not provided; won't search.");
      return [];
    }

    console.log(`Authenticated; requesting search data for "${term}"...`);
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        { headers: {Authorization: `Bearer ${token}`} }
      );
    
      const jsonData = await response.json();
      const jsonTracks = jsonData.tracks.items;
      return jsonTracks.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      });
    } catch(e) {
      console.log(e);
      return [];
    }
  }
};


export default Spotify;
