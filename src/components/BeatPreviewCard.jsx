import("./BeatPreviewCard.css");
import { serverURLs } from "./../util/constans";
import { convertPath } from "../util/convertPath";

import { AudioContext } from "../context/audioContext";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import LoadingIndicator from "./LoadingIndicator";
import Hashtag from "./Hashtag";

const BeatPreviewCard = ({
  currentBeat,
  setCurrentBeat,
  beat,
  navigate,
  page,
}) => {
  const { play, pause, setTrack } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatOwnerName, setBeatOwnerName] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);

  //! Handle cover photo (must be an effect)
  const photoPath = beat.photo;
  const cover = `${serverURLs.BEAT_IMAGES}/${convertPath(
    photoPath,
    "beatPhoto"
  )}`;

  function handleBeatName() {
    if (beat.name.length > 20) {
      return beat.name.slice(0, 20) + "...";
    } else {
      return beat.name;
    }
  }

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

      // This can get deleted
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

  useEffect(() => {
    async function getOwner() {
      // Get user info
      const userRes = await fetch(`${serverURLs.USERS}/${beat.owner}`);
      const userData = await userRes.json();
      const user = userData.data.data.user;
      const userName = user.name;
      setBeatOwnerName(userName);
      setIsUserLoading(false);
    }
    getOwner();
  }, [beat]);

  if (isUserLoading) {
    return <LoadingIndicator />;
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
        <div className="beat-title">
          <h3>{`${handleBeatName()}`}</h3>
          <div className="hashtags">
            {beat.type.slice(0, 2).map((type, index) => (
              <Hashtag key={index}>{type}</Hashtag>
            ))}
          </div>
        </div>
        <div className="alt-info">
          <p>{beatOwnerName} </p>
          <p>|</p>
          <p>{beat.bpm} BPM </p>
          <p>|</p>
          <p>{beat.key}</p>
          <p>|</p>
          {beat.paid ? <p>Sold</p> : <p>Avaliable</p>}
        </div>
      </div>

      <Button type="outlined-button" submit={navigate}>
        Details
      </Button>
    </div>
  );
};

export default BeatPreviewCard;
