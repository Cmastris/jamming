import './Track.css';

function Track({ track, name, artist, album, isRemoval, onAdd, onRemove }) {

  function addTrack() {
    onAdd(track);
  }

  function removeTrack() {
    onRemove(track);
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      <button className="Track-action" onClick={isRemoval ? removeTrack : addTrack}>
        {isRemoval ? "-" : "+"}
      </button>
    </div>
  );
}
  
export default Track;