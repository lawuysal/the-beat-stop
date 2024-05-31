import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./../components/AudioPlayer.css";
import { useContext } from "react";
import { serverURLs } from "../util/constans";
import { AudioContext } from "../context/audioContext";

const playerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  bottom: "0",
  width: "100%",
  height: "150px",
};

const AudioPlayer = () => {
  const { audioRef, currentTrack: track } = useContext(AudioContext);

  return (
    <div className="player" style={playerStyle}>
      <ReactAudioPlayer
        volume={0.2}
        src={
          track && track.src
            ? track.src
            : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        }
        onPlay={() => console.log("onPlay")}
        ref={audioRef}
        header={
          <div className="song-info">
            <img
              src={
                track && track.cover
                  ? track.cover
                  : `${serverURLs.BEAT_IMAGES}/default/default-large.jpg`
              }
              alt="photo"
              style={{ width: "65px", height: "65px", objectFit: "scale-down" }}
            />
            <div className="texts">
              <p className="song-name">
                {track && track.songName ? track.songName : "Song Name"}
              </p>
              <p className="artist-name">
                {track && track.artistName ? track.artistName : "Artist Name"}
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default AudioPlayer;
