import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./../components/AudioPlayer.css";
import React from "react";
import { serverURLs } from "../util/constans";

const AudioPlayer = React.forwardRef(function a({ track }, ref) {
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
        src={
          track && track.src
            ? track.src
            : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        }
        onPlay={() => console.log("onPlay")}
        ref={ref}
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
});

export default AudioPlayer;
