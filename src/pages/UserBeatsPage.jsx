import("./UserBeatsPage.css");
import { serverURLs } from "../util/constans";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../context/userContext";

import BeatPreviewCard from "../components/BeatPreviewCard";
import AudioPlayer from "../components/AudioPlayer";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";

const UserBeatsPage = () => {
  const playerRef = useRef(null);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [currentBeat, setCurrentBeat] = useState("");
  const [beats, setBeats] = useState([]);
  const [isThereBeats, setIsThereBeats] = useState(false);
  const [isBeatsLoading, setIsBeatsLoading] = useState(true);
  const [playerTrack, setPlayerTrack] = useState(null);

  function handlePlayPause(isPlaying) {
    if (isPlaying) {
      playerRef.current.audio.current.pause();
    } else {
      playerRef.current.audio.current.play();
    }
  }

  function handleNavigateDetails(beatId) {
    navigate(`/beats/${beatId}`);
  }

  useEffect(
    function () {
      setIsBeatsLoading(true);
      async function fetchSong() {
        const res = await fetch(`${serverURLs.BEATS}/user/${user._id}`);
        const data = await res.json();
        const beats = data.data.beats;
        if (beats.length > 0) {
          setIsThereBeats(true);
        } else {
          setIsThereBeats(false);
        }

        setBeats(beats);
        setIsBeatsLoading(false);
      }
      fetchSong();
    },
    [user._id]
  );
  return (
    <>
      (
      <div className="beats-page">
        <div className="header">
          <h1 className="beats-page-title">Your Beats:</h1>
          <Button type="normal-button" submit={() => navigate(`/create-beat`)}>
            Create New Beat
          </Button>
        </div>
        {!isBeatsLoading ? (
          isThereBeats ? (
            beats.map((beat, index) => (
              <BeatPreviewCard
                key={index}
                beat={beat}
                currentBeat={currentBeat}
                setCurrentBeat={setCurrentBeat}
                setPlayerTrack={setPlayerTrack}
                onPlayPause={handlePlayPause}
                navigate={() => handleNavigateDetails(beat._id)}
              />
            ))
          ) : (
            <h1 className="no-beats-message">You have no beats yet</h1>
          )
        ) : (
          <LoadingIndicator></LoadingIndicator>
        )}
      </div>
      )<AudioPlayer track={playerTrack} ref={playerRef}></AudioPlayer>
    </>
  );
};

export default UserBeatsPage;
