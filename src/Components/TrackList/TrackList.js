import './TrackList.css';
import Track from '../Track/Track';

function TrackList({ tracks, isRemoval, onAdd }) {
  return (
    <div className="TrackList">
      {tracks.map(t => <Track track={t}
                              key={t.id} 
                              name={t.name}
                              artist={t.artist}
                              album={t.album} 
                              isRemoval={isRemoval}
                              onAdd={onAdd} />)}
    </div>
  );
}
  
export default TrackList;