import { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  const [searchResults, setSearchResults] = useState([]);

  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

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
    </div>
  );
}

export default App;
