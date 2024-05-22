import("./BeatPreviewCard.css");
import { serverURLs } from "./../util/constans";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useState } from "react";

const BeatPreviewCard = ({ beat, currentTrack, setCurrentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlay() {
    if (currentTrack !== beat._id) {
      setCurrentTrack(`${beat._id}`);
      setIsPlaying(true);
    } else if (currentTrack === beat._id) {
      setIsPlaying(false);
      setCurrentTrack("");
    }
  }

  return (
    <div className="card-container">
      {!isPlaying || currentTrack !== beat._id ? (
        <BsFillPlayFill onClick={() => handlePlay()} className="play-button" />
      ) : (
        <BsFillPauseFill onClick={() => handlePlay()} className="play-button" />
      )}
      <div className="cover-wrapper">
        <img
          src={`${serverURLs.BEAT_IMAGES}/default/default-large.jpg`}
          alt="kljlk"
        />
      </div>
      <div className="beat-info">
        <h3>{beat.name}</h3>
        <p>{beat.summary}</p>
      </div>
    </div>
  );
};

export default BeatPreviewCard;
