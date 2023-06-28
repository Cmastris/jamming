import './Track.css';

function Track({ track, name, artist, album, isRemoval, onAdd }) {

  function renderAction() {
    return isRemoval ? "-" : "+";
  }

  function addTrack() {
    onAdd(track);
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      <button className="Track-action" onClick={addTrack}>{renderAction()}</button>
    </div>
  );
}
  
export default Track;