import { useReducer, useEffect, useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { serverURLs } from "./../util/constans";

function useBeat({ beatId }) {
  const initialDataState = {
    name: "",
    summary: "",
    description: "",
    type: "",
    key: "",
    owner: "",
    bpm: "0",
    createdDate: "",
    paid: false,
    tracks: [],
    license: "free",
    photo: undefined,
    fullTrack: undefined,
    _id: "",
  };

  const initialValidationState = {
    name: {
      isValid: false,
      message: "Name must be between 3 and 20 characters",
    },
    summary: {
      isValid: false,
      message: "Summary must be between 3 and 50 characters",
    },
    description: {
      isValid: true,
      message: "Description must be between 3 and 200 characters",
    },
    type: {
      isValid: false,
      message: "Type must be between 3 and 100 characters",
    },
    key: { isValid: false, message: "Key must be between 2 and 15 characters" },
    bpm: {
      isValid: false,
      message: "BPM must be a whole number between 50-250",
    },
    license: {
      isValid: true,
      message: "License must be free, basic, standard, or pro",
    },
    paid: {
      isValid: true,
      message: "Paid must be true or false",
    },
    photo: { isValid: false, message: "Photo must be choosen" },
    fullTrack: { isValid: false, message: "Track must be choosen" },
  };

  const navigate = useNavigate();
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);
  const [validationState, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );
  const [isBeatLoading, setIsBeatLoading] = useState(false);
  const [fetchedTracks, setFetchedTracks] = useState([]);

  function dataReducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.value };
      case "summary":
        return { ...state, summary: action.value };
      case "description":
        return { ...state, description: action.value };
      case "type":
        return { ...state, type: action.value };
      case "key":
        return { ...state, key: action.value };
      case "bpm":
        return { ...state, bpm: action.value };
      case "paid":
        return { ...state, paid: action.value };
      case "license":
        return { ...state, license: action.value };
      case "photo":
        return { ...state, photo: action.value };
      case "fullTrack":
        return { ...state, fullTrack: action.value };
      case "FETCH_BEAT":
        return { ...state, ...action.value };
      default:
        return state;
    }
  }

  function validationReducer(state, action) {
    switch (action.type) {
      case "name":
        return {
          ...state,
          name: {
            isValid: validator.isLength(action.value, { min: 3, max: 20 }),
          },
        };
      case "summary":
        return {
          ...state,
          summary: {
            isValid: validator.isLength(action.value, { min: 3, max: 50 }),
          },
        };
      case "description":
        return {
          ...state,
          description: {
            isValid: validator.isLength(action.value, { min: 3, max: 200 }),
          },
        };
      case "type":
        return {
          ...state,
          type: {
            isValid: validator.isLength(action.value, { min: 3, max: 100 }),
          },
        };
      case "key":
        return {
          ...state,
          key: {
            isValid: validator.isLength(action.value, { min: 2, max: 15 }),
          },
        };
      case "bpm":
        return {
          ...state,
          bpm: {
            isValid: validator.isInt(action.value, { min: 50, max: 250 }),
          },
        };
      case "license":
        return {
          ...state,
          license: {
            isValid: ["free", "basic", "standard", "pro"].includes(
              action.value
            ),
          },
        };
      case "paid":
        return {
          ...state,
          paid: {
            isValid: !!action.value === true || !!action.value === false,
          },
        };
      case "photo":
        return {
          ...state,
          photo: {
            isValid: action.value !== undefined,
          },
        };
      case "fullTrack":
        return {
          ...state,
          fullTrack: {
            isValid: action.value !== undefined,
          },
        };
      default:
        return state;
    }
  }

  function handleName(value) {
    validationDispatch({ type: "name", value: value });
    dataDispatch({ type: "name", value: value });
  }

  function handleSummary(value) {
    validationDispatch({ type: "summary", value: value });
    dataDispatch({ type: "summary", value: value });
  }

  function handleType(value) {
    validationDispatch({ type: "type", value: value });
    dataDispatch({ type: "type", value: value });
  }

  function handleKey(value) {
    validationDispatch({ type: "key", value: value });
    dataDispatch({ type: "key", value: value });
  }

  function handleBPM(value) {
    validationDispatch({ type: "bpm", value: value });
    dataDispatch({ type: "bpm", value: value });
  }

  function handleLicense(e) {
    e.preventDefault();
    validationDispatch({ type: "license", value: e.target.value });
    dataDispatch({ type: "license", value: e.target.value });
  }

  function handlePaid(e) {
    e.preventDefault();
    validationDispatch({ type: "paid", value: e.target.value });
    dataDispatch({ type: "paid", value: e.target.value });
  }

  function handlephoto(value) {
    validationDispatch({ type: "photo", value: value });
    dataDispatch({ type: "photo", value: value });
  }

  function handleFullTrack(value) {
    validationDispatch({ type: "fullTrack", value: value });
    dataDispatch({ type: "fullTrack", value: value });
  }

  function handleDescription(value) {
    validationDispatch({ type: "description", value: value });
    dataDispatch({ type: "description", value: value });
  }

  async function handleBeatUpdate() {
    validationDispatch({ type: "name", value: dataState.name });
    validationDispatch({ type: "summary", value: dataState.summary });
    validationDispatch({ type: "description", value: dataState.description });
    validationDispatch({ type: "type", value: dataState.type.toString() });
    validationDispatch({ type: "key", value: dataState.key });
    validationDispatch({ type: "bpm", value: dataState.bpm });
    validationDispatch({ type: "license", value: dataState.license });
    validationDispatch({ type: "paid", value: dataState.paid });

    if (
      validationState.name.isValid &&
      validationState.summary.isValid &&
      validationState.description.isValid &&
      validationState.type.isValid &&
      validationState.key.isValid &&
      validationState.bpm.isValid &&
      validationState.license.isValid &&
      validationState.paid.isValid
    ) {
      const editedFields = {
        name: dataState.name,
        summary: dataState.summary,
        description: dataState.description,
        type: dataState.type,
        key: dataState.key,
        bpm: dataState.bpm,
        license: dataState.license,
        paid: dataState.paid,
      };

      const editResponse = await fetch(
        `${serverURLs.BEATS_EDIT_MAIN}/${beatId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedFields),
        }
      );

      if (editResponse.ok) {
        {
          navigate("/beats/" + beatId);
        }
      }
    } else {
      alert("Some fields are not valid");
    }
  }

  useEffect(
    function () {
      async function fetchBeat() {
        setIsBeatLoading(true);
        const response = await fetch(`${serverURLs.BEATS}/${beatId}`);
        const data = await response.json();
        const beat = data.data.beat;

        if (beat.tracks) {
          let fTracks = [];
          for (let i = 0; i < beat.tracks.length; i++) {
            const trackResponse = await fetch(
              `${serverURLs.TRACKS}/${beat.tracks[i]}`
            );
            const trackData = await trackResponse.json();
            fTracks.push(trackData.data.data.track);
          }
          setFetchedTracks(fTracks);
        }

        setIsBeatLoading(false);
        dataDispatch({ type: "FETCH_BEAT", value: beat });
      }
      fetchBeat();
    },
    [beatId]
  );

  const handleFunctions = {
    handleName,
    handleSummary,
    handleDescription,
    handleType,
    handleKey,
    handleBPM,
    handleLicense,
    handlePaid,
    handlephoto,
    handleFullTrack,
    handleBeatUpdate,
  };

  return {
    isBeatLoading,
    dataState,
    validationState,
    handleFunctions,
    fetchedTracks,
  };
}

export default useBeat;
