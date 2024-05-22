import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./../components/AudioPlayer.css";

export default function AudioPlayer() {
  const playerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: "0",
    width: "100%",
    height: "150px",
  };

  return (
    <div className="player" style={playerStyle}>
      <ReactAudioPlayer
        // src="https://cdn.freesound.org/previews/731/731352_15857333-lq.mp3"
        // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        src="http://localhost:3001/tracks/6604178ac93ccb58387d3ba4/intro_20-1711580542851.mp3"
        onPlay={(e) => console.log("onPlay")}
        // other props here
        header={
          <div className="song-info">
            <img
              src="https://www.artmajeur.com/medias/standard/r/a/raffaella-carrera/artwork/11011291_50x50.jpg"
              alt="photo"
              style={{ width: "65px", height: "65px" }}
            />
            <div className="texts">
              <p className="song-name">Song Name</p>
              <p className="artist-name">Artist Name</p>
            </div>
          </div>
        }
        // layout="horizontal"
      />
    </div>
  );
}
