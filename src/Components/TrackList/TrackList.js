import './TrackList.css';
import Track from '../Track/Track';

function TrackList({ tracks }) {
  return (
    <div className="TrackList">
      {tracks.map(t => <Track key={t.id} name={t.name} artist={t.artist} album={t.album} />)}
    </div>
  );
}
  
export default TrackList;