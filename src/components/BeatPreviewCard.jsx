import("./BeatPreviewCard.css");
import { serverURLs } from "./../util/constans";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useState } from "react";

const BeatPreviewCard = ({
  beat,
  currentBeat,
  setCurrentBeat,
  setPlayerTrack,
  onPlayPause,
  navigate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle cover photo
  const photoPath = beat.photo;
  const coverPath = photoPath
    .replace("dev-data\\images\\beat-images\\", "")
    .replace(/\\/g, "/");
  const cover = `${serverURLs.BEAT_IMAGES}/${coverPath}`;

  async function handlePlay() {
    if (currentBeat !== beat._id) {
      setCurrentBeat(`${beat._id}`);
      setIsPlaying(true);

      // Get track info
      const res = await fetch(`${serverURLs.TRACKS}/${beat.fullTrack}`);
      const data = await res.json();
      const track = data.data.data.track;
      const unfilteredPath = track.path;
      const path = unfilteredPath
        .replace("dev-data\\tracks\\", "")
        .replace(/\\/g, "/");
      const exactPath = `${serverURLs.TRACK_FILES}/${path}`;

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
        src: exactPath,
      };

      setPlayerTrack(newTrack);
      onPlayPause(isPlaying);
    } else if (currentBeat === beat._id) {
      setIsPlaying(false);
      setCurrentBeat("");
      onPlayPause(isPlaying);
    }
  }

  return (
    <div className="card-container" onClick={navigate}>
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
    </div>
  );
};

export default BeatPreviewCard;
