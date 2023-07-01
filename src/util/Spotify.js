import cid from './secrets';

const clientId = cid;
const redirectURI = "http://localhost:3000/";
const APIBaseURI = "https://api.spotify.com/v1";

const Spotify = {

  _token: null,

  getAccessToken() {
    if (this._token) {
      console.log('Token already set; returning token.');
      return this._token;
    
    } else {
      // https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow
      console.log('Token not set; attempting to retrieve token from URL.');
      this._getTokenFromURL();
      if (this._token) {
        console.log('Token retrieved from URL.');
        return this._token;
      } else {
        console.log('Token not found in URL; authorising user externally.');
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  },

  _getTokenFromURL() {
    const url = window.location.href;
    let tokenMatch = url.match(/access_token=([^&]*)/);
    let expiryMatch = url.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiryMatch) {
      this._setAuthData(tokenMatch[1], expiryMatch[1]);
      return this._token;
    }
    return false;
  },

  _setAuthData(URLToken, URLExpiry) {
    this._token = URLToken;
    window.setTimeout(this.clearAccessToken, Number(URLExpiry)*1000);
    window.history.pushState('Access Token', null, '/');  // Remove auth data from URL
  },

  clearAccessToken() {
    this._token = null;
    console.log('Token cleared.');
  },

  async search(term) {
    // https://developer.spotify.com/documentation/web-api/concepts/api-calls
    // https://developer.spotify.com/documentation/web-api/reference/search
    
    let token = this.getAccessToken();
    if (!token) {
      console.log("Not authenticated; won't search.");
      return [];
    }

    if (term.length < 1) {
      console.log("Search term not provided; won't search.");
      return [];
    }

    console.log(`Authenticated; requesting search data for "${term}"...`);
    try {
      const response = await fetch(`${APIBaseURI}/search?type=track&q=${term}`,
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
  },

  async savePlaylist(name, URIs) {

    if (name.length < 1) {
      console.log("Playlist name not provided; won't save playlist.");
      return;
    }

    let token = this.getAccessToken();
    if (!token) {
      console.log("Not authenticated; won't save playlist.");
      return;
    }

    console.log(`Authenticated; saving "${name}" playlist...`);
    try {
      // Get user ID
      let headers = {Authorization: `Bearer ${token}`};
      const userIdResponse = await fetch(`${APIBaseURI}/me`,
        { headers: headers }
      );
      const jsonUserIdResponse = await userIdResponse.json();
      const userId = jsonUserIdResponse.id;

      // Create empty playlist
      const playlistCreateResponse = await fetch(`${APIBaseURI}/users/${userId}/playlists`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            name: name,
            description: "Created via the Jamming app."
          })
        }
      );
      const jsonPlaylistCreateResponse = await playlistCreateResponse.json();
      const playlistId = jsonPlaylistCreateResponse.id;

      // Return if no tracks provided
      if (!URIs || URIs.length < 1) {
        console.log(`Empty playlist "${name}" (${playlistId}) created.`);
        return playlistId;
      }

      // Add tracks to playlist
      await fetch(`${APIBaseURI}/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            uris: URIs
          })
        }
      );

      console.log(`Playlist "${name}" (${playlistId}) created.`);
      return playlistId;
      
    } catch(e) {
      console.log(e);
      return;
    }
  }
};


export default Spotify;
