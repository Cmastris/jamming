import './Track.css';

function Track({ name, artist, album, isRemoval }) {

  function renderAction() {
    return isRemoval ? "-" : "+";
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      <button className="Track-action">{renderAction()}</button>
    </div>
  );
}
  
export default Track;