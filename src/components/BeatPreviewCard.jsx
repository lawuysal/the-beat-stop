import("./BeatPreviewCard.css");
import { serverURLs } from "./../util/constans";
import { convertPath } from "../util/convertPath";

import { AudioContext } from "../context/audioContext";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useState, useContext } from "react";
import Button from "./Button";

const BeatPreviewCard = ({
  currentBeat,
  setCurrentBeat,
  beat,
  navigate,
  page,
}) => {
  const { play, pause, setTrack } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle cover photo
  const photoPath = beat.photo;
  const cover = `${serverURLs.BEAT_IMAGES}/${convertPath(
    photoPath,
    "beatPhoto"
  )}`;

  async function handlePlay() {
    if (currentBeat !== beat._id) {
      setCurrentBeat(`${beat._id}`);
      setIsPlaying(true);

      // Get track info
      const res = await fetch(`${serverURLs.TRACKS}/${beat.fullTrack}`);
      const data = await res.json();
      const track = data.data.data.track;
      const path = `${serverURLs.TRACK_FILES}/${convertPath(
        track.path,
        "track"
      )}`;

      // Get user info
      const userRes = await fetch(`${serverURLs.USERS}/${beat.owner}`);
      const userData = await userRes.json();
      const user = userData.data.data.user;
      const userName = user.name;

      // Create new track object
      const newTrack = {
        artistName: userName,
        songName: beat.name,
        cover: cover,
        src: path,
      };

      setTrack(newTrack);
    } else if (currentBeat === beat._id) {
      setIsPlaying(false);
      setCurrentBeat("");
    }
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  return (
    <div className="card-container">
      {!isPlaying || currentBeat !== beat._id ? (
        <BsFillPlayFill onClick={() => handlePlay()} className="play-button" />
      ) : (
        <BsFillPauseFill onClick={() => handlePlay()} className="play-button" />
      )}
      <div className="cover-wrapper">
        <img src={cover} alt="kljlk" id="cover-image" />
      </div>
      <div className="beat-info">
        <h3>{beat.name}</h3>
        <p>{`"${beat.summary}"`}</p>
      </div>
      {page === "user-beats" ? (
        <Button type="outlined-button" submit={navigate}>
          Details
        </Button>
      ) : null}
    </div>
  );
};

export default BeatPreviewCard;
