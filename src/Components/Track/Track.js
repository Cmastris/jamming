import './Track.css';

function Track() {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>Track Name</h3>
        <p>Track Artist | Track Album</p>
      </div>
      <button className="Track-action">+ or -</button>
    </div>
  );
}
  
export default Track;