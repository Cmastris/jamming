import './SearchBar.css';

function SearchBar({ onSearch }) {

  let searchInput = "";

  function handleTermChange(e) {
    searchInput = e.target.value;
  }

  function search() {
    onSearch(searchInput);
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
