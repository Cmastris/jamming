function AuthButton({ onClick }) {
  return (
    <div className="AuthButton">
      <p>Please allow this app to use your Spotify account to search for tracks and save playlists.</p>
      <button className="AuthButton" onClick={onClick}>ALLOW SPOTIFY ACCESS</button>
    </div>
  );
}

export default AuthButton;
