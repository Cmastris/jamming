import { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const [searchResults, setSearchResults] = useState([
    { name: "SR Name 1", artist: "Artist 1", album: "Album 1", id: 1 },
    { name: "SR Name 2", artist: "Artist 2", album: "Album 2", id: 2 },
    { name: "SR Name 3", artist: "Artist 3", album: "Album 3", id: 3 }
  ]);

  const [playlistName, setPlaylistName] = useState("My Playlist");

  const [playlistTracks, setPlaylistTracks] = useState([
    { name: "PL Name 1", artist: "Artist 1", album: "Album 1", id: 1 },
    { name: "PL Name 2", artist: "Artist 2", album: "Album 2", id: 2 },
    { name: "PL Name 3", artist: "Artist 3", album: "Album 3", id: 3 }
  ]);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
        </div>
      </div>
    </div>
  );
}

export default App;
