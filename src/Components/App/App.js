import { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {

  const [searchResults, setSearchResults] = useState([]);

  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function search(query) {
    console.log(query);
    // TODO: query Spotify API and update `searchResults`
    setSearchResults([
    { name: "Track 1", artist: "Artist 1", album: "Album 1", id: 1, uri: 101 },
    { name: "Track 2", artist: "Artist 2", album: "Album 2", id: 2, uri: 102 },
    { name: "Track 3", artist: "Artist 3", album: "Album 3", id: 3, uri: 103 }
  ]);
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

  function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    // TODO: save as playlist to Spotify using `playlistName` and `trackURIs`
    console.log(trackURIs);
    console.log(playlistName);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);

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
