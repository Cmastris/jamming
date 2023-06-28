import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={searchResults} isRemoval={false} onAdd={onAdd} />
    </div>
  );
}

export default SearchResults;