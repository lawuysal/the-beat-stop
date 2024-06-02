import STYLES from "./CreateBeatPage.module.css";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import validator from "validator";

import { useReducer } from "react";
import { serverURLs } from "../util/constans";

export default function CreateBeatPage() {
  const initialDataState = {
    name: "",
    summary: "",
    type: "",
    key: "",
    bpm: "",
    license: "free",
    photo: undefined,
    fullTrack: undefined,
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
    photo: { isValid: false, message: "Photo must be choosen" },
    fullTrack: { isValid: false, message: "Track must be choosen" },
  };

  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);
  const [validationState, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );

  function dataReducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.value };
      case "summary":
        return { ...state, summary: action.value };
      case "type":
        return { ...state, type: action.value };
      case "key":
        return { ...state, key: action.value };
      case "bpm":
        return { ...state, bpm: action.value };
      case "license":
        return { ...state, license: action.value };
      case "photo":
        return { ...state, photo: action.value };
      case "fullTrack":
        return { ...state, fullTrack: action.value };
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

  function handlephoto(value) {
    validationDispatch({ type: "photo", value: value });
    dataDispatch({ type: "photo", value: value });
  }

  function handlefullTrack(value) {
    validationDispatch({ type: "fullTrack", value: value });
    dataDispatch({ type: "fullTrack", value: value });
  }

  async function handleSubmit() {
    validationDispatch({ type: "name", value: dataState.name });
    validationDispatch({ type: "summary", value: dataState.summary });
    validationDispatch({ type: "type", value: dataState.type });
    validationDispatch({ type: "key", value: dataState.key });
    validationDispatch({ type: "bpm", value: dataState.bpm });
    validationDispatch({ type: "license", value: dataState.license });
    validationDispatch({ type: "photo", value: dataState.photo });
    validationDispatch({ type: "fullTrack", value: dataState.fullTrack });

    const allFieldsValid = Object.values(validationState).every(
      (field) => field.isValid
    );

    if (allFieldsValid) {
      console.log("All fields are valid");
      const formData = new FormData();

      formData.append("owner", "6604178ac93ccb58387d3ba4");

      // File appending must be come after other fields
      for (const key in dataState) {
        formData.append(key, dataState[key]);
      }

      const res = await fetch(`${serverURLs.BEATS}`, {
        method: "POST",
        body: formData,
      });

      console.log(res);
    } else {
      console.log("Some fields are invalid");
    }
  }

  return (
    <>
      <div className={STYLES.createNewBeatPage}>
        <h1>Create a New Beat</h1>
        <InputBox
          type="text"
          callback={(val) => handleName(val)}
          error={validationState.name}
        >
          Name
        </InputBox>
        <InputBox
          type="text"
          callback={handleSummary}
          error={validationState.summary}
        >
          Summary
        </InputBox>
        <InputBox
          type="text"
          callback={handleType}
          error={validationState.type}
        >
          Type (You can add multiple types separated by commas)
        </InputBox>
        <InputBox type="text" callback={handleKey} error={validationState.key}>
          Key
        </InputBox>
        <InputBox type="text" callback={handleBPM} error={validationState.bpm}>
          BPM
        </InputBox>
        <label>License:</label>
        <select className={STYLES.licenseDropdown} onChange={handleLicense}>
          <option value="free">Free</option>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="pro">Pro</option>
        </select>

        <InputBox
          type="file"
          accept="image/*"
          callback={handlephoto}
          error={validationState.photo}
        >
          Photo
        </InputBox>
        <InputBox
          type="file"
          accept="audio/*"
          callback={handlefullTrack}
          error={validationState.fullTrack}
        >
          Full Track
        </InputBox>
        <Button type="normal-button" submit={handleSubmit}>
          Create Beat
        </Button>
      </div>
    </>
  );
}
