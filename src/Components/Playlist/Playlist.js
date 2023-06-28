import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({ playlistName, playlistTracks }) {
  return (
    <div className="Playlist">
      <input defaultValue={'New Playlist'} />
      <TrackList tracks={playlistTracks} isRemoval={true} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;