// AudioContext.js
import { createContext, useState, useRef } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const setTrack = (track) => {
    if (audioRef.current) {
      if (currentTrack !== track) {
        setCurrentTrack(track);
        play();
      }
      setIsPlaying(true);
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.audio.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{ setTrack, play, pause, currentTrack, isPlaying, audioRef }}
    >
      {children}
    </AudioContext.Provider>
  );
};
