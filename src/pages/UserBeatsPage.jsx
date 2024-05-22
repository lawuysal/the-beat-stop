import("./UserBeatsPage.css");

import NavBar from "../components/NavBar";
import BeatPreviewCard from "../components/BeatPreviewCard";

import { useState, useEffect } from "react";
import { serverURLs } from "../util/constans";
import AudioPlayer from "../components/AudioPlayer";

const UserBeatsPage = () => {
  const [currentTrack, setCurrentTrack] = useState("");
  const [beats, setBeats] = useState([]);

  useEffect(function () {
    async function fetchSong() {
      const res = await fetch(
        `${serverURLs.BEATS}/user/6604178ac93ccb58387d3ba4`
      );
      const data = await res.json();
      const beats = data.data.beats;

      setBeats(beats);
      console.log(beats);
    }
    fetchSong();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <h1 className="beats-page-title">Your Beats</h1>
      <div className="beats-page">
        {beats.map((beat, index) => (
          <BeatPreviewCard
            key={index}
            beat={beat}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        ))}
      </div>
      <AudioPlayer></AudioPlayer>
    </>
  );
};

export default UserBeatsPage;
