import classes from "./BeatDetailedPage.module.css";

import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { serverURLs } from "./../util/constans";
import { convertPath } from "../util/convertPath";

import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import TrackCard from "../components/TrackCard";
import InputBox from "../components/InputBox";

function BeatDetailedPage() {
  const initialBeatState = {
    bpm: 0,
    createdDate: "",
    description: "",
    fullTrack: "",
    key: "",
    license: "free",
    name: "",
    owner: "",
    paid: false,
    photo: "",
    summary: "",
    tracks: [],
    type: [],
    _id: "",
  };

  const { beatId } = useParams();
  const navigate = useNavigate();
  const [isBeatLoading, setIsBeatLoading] = useState(true);
  const [isAddTrackMode, setIsAddTrackMode] = useState(false);
  const [trackFile, setTrackFile] = useState(undefined);
  const [trackFileError, setTrackFileError] = useState({
    isValid: false,
    message: "Track must be choosen",
  });
  const [beatState, beatDispatch] = useReducer(beatReducer, initialBeatState);

  function beatReducer(state, action) {
    switch (action.type) {
      case "FETCH_BEAT":
        return { ...state, ...action.payload };

      default:
        return state;
    }
  }

  function handleBeatEdit() {
    navigate(`/beats/edit/${beatId}`);
  }

  async function handleBeatDelete() {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this beat?"
    );
    if (userConfirmation) {
      await fetch(`${serverURLs.BEATS}/${beatId}`, { method: "DELETE" });
      navigate("/user/beats");
    }
  }

  function handleAddTrack(value) {
    setTrackFile(value);
    if (value) {
      setTrackFileError({ isValid: true, message: "" });
    } else {
      setTrackFileError({ isValid: false, message: "Track must be choosen" });
    }
  }

  async function handleUploadTrack() {
    if (trackFile) {
      setTrackFileError({ isValid: true, message: "" });

      const uploader = beatState.owner;
      const formData = new FormData();
      formData.append("uploader", uploader);
      formData.append("file", trackFile);

      let res = await fetch(`${serverURLs.TRACKS}`, {
        method: "POST",
        body: formData,
      });
      let data = await res.json();

      const track = data.data.track;
      const newTrackId = track._id;

      res = await fetch(
        `${serverURLs.BEATS_ADDTRACK}/${beatId}/${newTrackId}`,
        { method: "PATCH" }
      );

      data = await res.json();
      let newBeat = data.data.beat;

      if (res.status === 201) {
        setTrackFile(undefined);
        setIsAddTrackMode(false);
        beatDispatch({ type: "FETCH_BEAT", payload: newBeat });
        window.location.reload();
      }
    }
    setTrackFileError({ isValid: false, message: "Track must be choosen" });
  }

  //* Resetting the track files and error when the add track mode is changed
  useEffect(
    function () {
      if (!isAddTrackMode) {
        setTrackFile(undefined);
        setTrackFileError({
          isValid: false,
          message: "Track must be choosen",
        });
      }
    },
    [isAddTrackMode]
  );

  //* Fetching the beat data with beatId
  useEffect(
    function () {
      async function fetchBeat() {
        setIsBeatLoading(true);
        const response = await fetch(`${serverURLs.BEATS}/${beatId}`);
        const data = await response.json();
        const beat = data.data.beat;
        setIsBeatLoading(false);
        beatDispatch({ type: "FETCH_BEAT", payload: beat });
      }
      fetchBeat();
    },
    [beatId]
  );
  return (
    <>
      {!isBeatLoading ? (
        <div className={`${classes.detailedPage}`}>
          <h1>Beat Detailed Page</h1>
          <img
            src={`${serverURLs.BEAT_IMAGES}/${convertPath(
              beatState.photo,
              "beatPhoto"
            )}`}
            alt=""
          />
          <p>Name: {`${beatState.name}`}</p>
          <p>Summary: {`${beatState.summary}`}</p>
          <p>Description: {`${beatState.description}`} </p>
          <p>Key: {`${beatState.key}`} </p>
          <p>BPM: {`${beatState.bpm}`} </p>
          <p>License: {`${beatState.license}`} </p>
          <p>Avaliable: {!beatState.paid ? "Yes" : "No"} </p>
          <p>Styles: {beatState.type.map((e) => `${e},`)} </p>
          <p>Tracks:</p>
          {beatState.tracks[0] ? (
            beatState.tracks.map((e, i) => (
              <TrackCard trackId={e} beatId={beatState._id} key={i} />
            ))
          ) : (
            <p>No tracks available</p>
          )}
          <Button
            type="outlined-button"
            submit={() => setIsAddTrackMode(!isAddTrackMode)}
          >
            Add Track
          </Button>
          {isAddTrackMode ? (
            <>
              <InputBox
                type="file"
                accept="audio/*"
                callback={handleAddTrack}
                error={trackFileError}
              ></InputBox>
              <Button type="normal-button" submit={handleUploadTrack}>
                Upload
              </Button>
            </>
          ) : (
            true
          )}

          <Button type="normal-button" submit={handleBeatDelete}>
            Delete Beat
          </Button>
          <Button type="normal-button" submit={handleBeatEdit}>
            Edit Beat
          </Button>
        </div>
      ) : (
        <LoadingIndicator></LoadingIndicator>
      )}
    </>
  );
}

export default BeatDetailedPage;
