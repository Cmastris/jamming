import './App.css';
import SearchResults from '../SearchResults/SearchResults';

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* Add a SearchBar component */}
        <div className="App-playlist">
          <SearchResults />
          {/* Add a Playlist component */}
        </div>
      </div>
    </div>
  );
}

export default App;
