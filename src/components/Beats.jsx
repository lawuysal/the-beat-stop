import STYLES from "./Beats.module.css";
import { serverURLs } from "../util/constans";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

import BeatPreviewCard from "./BeatPreviewCard";
import AudioPlayer from "./AudioPlayer";
import LoadingIndicator from "./LoadingIndicator";

const Beats = ({ page }) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [currentBeat, setCurrentBeat] = useState("");
  const [beats, setBeats] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isThereBeats, setIsThereBeats] = useState(false);
  const [isBeatsLoading, setIsBeatsLoading] = useState(true);

  function handlePageDependency() {
    switch (page) {
      case "user-beats":
        return `${serverURLs.BEATS}/user/${user._id}`;
      case "sold-beats":
        return `${serverURLs.BEATS}/user/sold/${user._id}`;
      case "purchased-beats":
        return `${serverURLs.BEATS}/user/bought/${user._id}`;
      default:
        return `/beats/user/${user._id}`;
    }
  }

  function handleNavigateDetails(beatId) {
    navigate(`/beats/${beatId}`);
  }

  useEffect(
    function () {
      setIsBeatsLoading(true);
      async function fetchSong() {
        const res = await fetch(handlePageDependency());
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
      if (user) {
        setIsUserLoading(false);
        fetchSong();
      }
    },
    [user]
  );

  if (isUserLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <>
      <div className={`${STYLES.beats}`}>
        {!isBeatsLoading ? (
          isThereBeats ? (
            beats.map((beat, index) => (
              <BeatPreviewCard
                key={index}
                beat={beat}
                currentBeat={currentBeat}
                setCurrentBeat={setCurrentBeat}
                navigate={() => handleNavigateDetails(beat._id)}
                page="user-beats"
              />
            ))
          ) : (
            <h1 className="no-beats-message">No beats found</h1>
          )
        ) : (
          <LoadingIndicator></LoadingIndicator>
        )}
      </div>
      <AudioPlayer></AudioPlayer>
    </>
  );
};

export default Beats;
