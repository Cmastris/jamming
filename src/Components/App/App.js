import { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {

  const [searchResults, setSearchResults] = useState([
    { name: "Track 1", artist: "Artist 1", album: "Album 1", id: 1 },
    { name: "Track 2", artist: "Artist 2", album: "Album 2", id: 2 },
    { name: "Track 3", artist: "Artist 3", album: "Album 3", id: 3 }
  ]);

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    const included = playlistTracks.find(playlistTrack => playlistTrack.id === track.id);
    if (!included) {
      const newPlaylist = [...playlistTracks];  // New array to trigger re-render
      newPlaylist.push(track);
      setPlaylistTracks(newPlaylist);
    }
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
        </div>
      </div>
    </div>
  );
}

export default App;
