import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({ playlistTracks }) {
  return (
    <div className="Playlist">
      <input defaultValue={'New Playlist'} />
      <TrackList tracks={playlistTracks} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;