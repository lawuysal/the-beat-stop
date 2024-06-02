import STYLES from "./BeatDetailedPage.module.css";

import { useEffect, useReducer, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { serverURLs } from "./../util/constans";
import { convertPath } from "../util/convertPath";

import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import TrackCard from "../components/TrackCard";
import InputBox from "../components/InputBox";
import Hashtag from "../components/Hashtag";

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

  const { user } = useContext(UserContext);
  const { beatId } = useParams();
  const navigate = useNavigate();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isBeatLoading, setIsBeatLoading] = useState(true);
  const [isAddTrackMode, setIsAddTrackMode] = useState(false);
  const [isBeatBuyer, setIsBeatBuyer] = useState(false);
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

  function handleNavigateBuyPage() {
    navigate(`/beats/buy/${beatId}`);
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

  useEffect(() => {
    if (user) {
      setIsUserLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && beatId) {
      fetch(`${serverURLs.PURCHASES}/is-buyer/${beatId}/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.isBuyer) {
            setIsBeatBuyer(true);
          } else {
            setIsBeatBuyer(false);
          }
        });
    }
  }, [beatId, user]);

  if (isUserLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <>
      {!isBeatLoading ? (
        <div className={STYLES.pageWrapper}>
          <div className={STYLES.detailedPage}>
            <div className={STYLES.main}>
              <div className={STYLES.summary}>
                <img
                  src={`${serverURLs.BEAT_IMAGES}/${convertPath(
                    beatState.photo,
                    "beatPhoto"
                  )}`}
                  alt="beat-photo"
                  id={STYLES.cover}
                />
                <div className={STYLES.beatTitle}>
                  <p className={STYLES.beatName}>{`${beatState.name}`}</p>
                  <p
                    className={STYLES.beatSummary}
                  >{`"${beatState.summary}"`}</p>
                </div>
              </div>
              <div className={STYLES.dividerWrapperVertical}>
                <div className={STYLES.dividerVertical}></div>
              </div>
              <div className={STYLES.attributes}>
                <div className={STYLES.attributeSection}>
                  <div className={STYLES.attributeWrapper}>
                    <p className={STYLES.attributeTitle}>KEY</p>
                    <p className={STYLES.attributeValue}>
                      {`${beatState.key.toUpperCase()}`}{" "}
                    </p>
                  </div>
                  <div className={STYLES.attributeWrapper}>
                    <p className={STYLES.attributeTitle}>BPM</p>
                    <p className={STYLES.attributeValue}>
                      {`${beatState.bpm}`}{" "}
                    </p>
                  </div>
                </div>
                <div className={STYLES.attributeSection}>
                  <div className={STYLES.attributeWrapper}>
                    <p className={STYLES.attributeTitle}>LICENSE</p>
                    <p className={STYLES.attributeValue}>
                      {`${beatState.license.toUpperCase()}`}{" "}
                    </p>
                  </div>
                  <div className={STYLES.attributeWrapper}>
                    <p className={STYLES.attributeTitle}>STATUS</p>
                    <p className={STYLES.attributeValue}>
                      {beatState.paid ? "SOLD" : "AVALIABLE"}{" "}
                    </p>
                  </div>
                </div>
                <div className={STYLES.attributeWrapper}>
                  <p className={STYLES.attributeTitle}>STYLES</p>
                  <div className={STYLES.hashtags}>
                    {beatState.type.map((type, index) => (
                      <Hashtag key={index}>{type}</Hashtag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={STYLES.dividerWrapperHorizontal}>
              <div className={STYLES.dividerHorizontal}></div>
            </div>
            <div className={STYLES.secondary}>
              <div className={STYLES.description}>
                <p className={STYLES.descriptionTitle}>Description</p>
                <p className={STYLES.descriptionText}>
                  {`"${beatState.description}"`}{" "}
                </p>
              </div>
              <div className={STYLES.otherSection}>
                <Button type="normal-button">Download Beat</Button>
                {user && user._id === beatState.owner && !beatState.paid ? (
                  <>
                    <Button type="normal-button" submit={handleBeatEdit}>
                      Edit Beat
                    </Button>

                    <Button type="outlined-button" submit={handleBeatDelete}>
                      Delete Beat
                    </Button>
                  </>
                ) : beatState.paid ? (
                  <></>
                ) : (
                  <Button type="normal-button" submit={handleNavigateBuyPage}>
                    Buy Beat
                  </Button>
                )}
              </div>
            </div>
            <div className={STYLES.dividerWrapperHorizontal}>
              <div className={STYLES.dividerHorizontal}></div>
            </div>
            <div className={STYLES.operations}>
              {isBeatBuyer ? (
                <></>
              ) : (
                <div className={`${STYLES.tracksWrapper}`}>
                  <p className={STYLES.attributeTitle}>
                    TRACKS ( {beatState.tracks.length} )
                  </p>
                  {beatState.tracks[0] ? (
                    beatState.tracks.map((e, i) => (
                      <TrackCard
                        trackId={e}
                        beatId={beatState._id}
                        key={i}
                        isSold={beatState.paid}
                      />
                    ))
                  ) : (
                    <p>No tracks available</p>
                  )}
                </div>
              )}
              <div className={STYLES.buttons}>
                {isBeatBuyer || beatState.paid ? (
                  <></>
                ) : !isAddTrackMode ? (
                  <></>
                ) : (
                  <>
                    <InputBox
                      type="file"
                      accept="audio/*"
                      callback={handleAddTrack}
                      error={trackFileError}
                    ></InputBox>
                    <Button type="outlined-button" submit={handleUploadTrack}>
                      Upload
                    </Button>
                  </>
                )}
                <div className={STYLES.addTrackSection}>
                  {!(user && user._id === beatState.owner) ? (
                    <></>
                  ) : beatState.paid ? (
                    <></>
                  ) : (
                    <Button
                      type="normal-button"
                      submit={() => setIsAddTrackMode(!isAddTrackMode)}
                    >
                      {!isAddTrackMode ? "Add Track" : "Cancel"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingIndicator></LoadingIndicator>
      )}
    </>
  );
}

export default BeatDetailedPage;
