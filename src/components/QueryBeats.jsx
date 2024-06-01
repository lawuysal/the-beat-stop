import STYLES from "./QueryBeats.module.css";
import { serverURLs } from "../util/constans";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BeatPreviewCard from "./BeatPreviewCard";
import AudioPlayer from "./AudioPlayer";
import LoadingIndicator from "./LoadingIndicator";

const Beats = () => {
  const navigate = useNavigate();
  const { query } = useParams();

  const [currentBeat, setCurrentBeat] = useState("");
  const [beats, setBeats] = useState([]);
  const [isThereBeats, setIsThereBeats] = useState(false);
  const [isBeatsLoading, setIsBeatsLoading] = useState(true);

  useEffect(
    function () {
      setIsBeatsLoading(true);
      async function fetchSong() {
        const res = await fetch(`${serverURLs.BEATS_QUERY}/${query}`);
        const data = await res.json();
        const beats = data.beats;
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
    [query]
  );

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
                page="query-beats"
              />
            ))
          ) : (
            <h1 className="no-beats-message">No beats found :(</h1>
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
