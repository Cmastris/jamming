import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({ playlistTracks, onRemove, onNameChange, onSave }) {

  function handleNameChange(e) {
    onNameChange(e.target.value);  // Input element text
  }

  return (
    <div className="Playlist">
      <input defaultValue={'New Playlist'} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} isRemoval={true} onRemove={onRemove} />
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;