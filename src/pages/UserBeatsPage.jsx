import("./UserBeatsPage.css");

import NavBar from "../components/NavBar";
import BeatPreviewCard from "../components/BeatPreviewCard";

import { useState, useEffect, useRef } from "react";
import { serverURLs } from "../util/constans";
import AudioPlayer from "../components/AudioPlayer";

import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";

const UserBeatsPage = () => {
  const playerRef = useRef(null);

  const [currentBeat, setCurrentBeat] = useState("");
  const [beats, setBeats] = useState([]);
  const [isBeatsLoading, setIsBeatsLoading] = useState(true);
  const [playerTrack, setPlayerTrack] = useState(null);

  function handlePlayPause(isPlaying) {
    if (isPlaying) {
      playerRef.current.audio.current.pause();
    } else {
      playerRef.current.audio.current.play();
    }
  }

  useEffect(function () {
    setIsBeatsLoading(true);
    async function fetchSong() {
      const res = await fetch(
        `${serverURLs.BEATS}/user/6604178ac93ccb58387d3ba4`
      );
      const data = await res.json();
      const beats = data.data.beats;

      setBeats(beats);
      setIsBeatsLoading(false);
    }
    fetchSong();
  }, []);
  return (
    <>
      <NavBar></NavBar>

      {!isBeatsLoading ? (
        <div className="beats-page">
          <div className="header">
            <h1 className="beats-page-title">Your Beats:</h1>
            <Button type="normal-button">Create New Beat</Button>
          </div>
          {beats.map((beat, index) => (
            <BeatPreviewCard
              key={index}
              beat={beat}
              currentBeat={currentBeat}
              setCurrentBeat={setCurrentBeat}
              setPlayerTrack={setPlayerTrack}
              onPlayPause={handlePlayPause}
            />
          ))}
        </div>
      ) : (
        <LoadingIndicator></LoadingIndicator>
      )}
      <AudioPlayer track={playerTrack} ref={playerRef}></AudioPlayer>
    </>
  );
};

export default UserBeatsPage;
