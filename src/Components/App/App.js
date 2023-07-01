import { useState } from 'react';
import './App.css';
import AuthButton from '../AuthButton/AuthButton';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function authenticate() {
    console.log("Checking authentication.");
    if (Spotify.getAccessToken()) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }

  async function search(query) {
    const results = await Spotify.search(query);
    setSearchResults(results);
  }

  function addTrack(track) {
    const included = playlistTracks.find(playlistTrack => playlistTrack.id === track.id);
    if (!included) {
      const newPlaylist = [...playlistTracks];  // New array to trigger re-render
      newPlaylist.push(track);
      setPlaylistTracks(newPlaylist);
    }
  }

  function removeTrack(track) {
    const newPlaylist = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    setPlaylistTracks(newPlaylist);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  async function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    const playlistId = await Spotify.savePlaylist(playlistName, trackURIs);
    if (playlistId) {
      console.log("Resetting playlist to default (empty) state.");
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    }
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      {authenticated ? (
        <div className="App">
          <SearchBar onSearch={search} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist playlistTracks={playlistTracks}
                      onRemove={removeTrack}
                      onNameChange={updatePlaylistName}
                      onSave={savePlaylist}
                      />
          </div>
        </div>
      ) : (
        <div className="App">
          <AuthButton onClick={authenticate} />
        </div>
      )}
    </div>
  );
}

export default App;
