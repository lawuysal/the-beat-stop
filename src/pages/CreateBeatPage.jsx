import("./CreateBeatPage.css");
import NavBar from "../components/NavBar";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import validator from "validator";

import { useReducer } from "react";

export default function CreateBeatPage() {
  const initialDataState = {
    name: "",
    summary: "",
    type: "",
    key: "",
    bpm: "",
    license: "free",
    image: "",
    audio: "",
  };

  const initialValidationState = {
    name: {
      isValid: true,
      message: "Name must be between 3 and 20 characters",
    },
    summary: {
      isValid: true,
      message: "Summary must be between 3 and 50 characters",
    },
    type: {
      isValid: true,
      message: "Type must be between 3 and 100 characters",
    },
    key: { isValid: true, message: "Key must be between 2 and 15 characters" },
    bpm: {
      isValid: true,
      message: "BPM must be a whole number between 50-250",
    },
    license: {
      isValid: true,
      message: "License must be free, basic, standard, or pro",
    },
    image: { isValid: true, message: "Photo must be choosen" },
    audio: { isValid: true, message: "Track must be choosen" },
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
      case "image":
        return { ...state, image: action.value };
      case "audio":
        return { ...state, audio: action.value };
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
      case "image":
        return {
          ...state,
          image: {
            isValid: action.value !== "",
          },
        };
      case "audio":
        return {
          ...state,
          audio: {
            isValid: action.value !== "",
          },
        };
      default:
        return state;
    }
  }

  function handleName(value) {
    validationDispatch({ type: "name", value: value });

    if (validationState.name.isValid) {
      dataDispatch({ type: "name", value: value });
    }
  }

  function handleSummary(value) {
    validationDispatch({ type: "summary", value: value });

    if (validationState.summary.isValid) {
      dataDispatch({ type: "summary", value: value });
    }
  }

  function handleType(value) {
    validationDispatch({ type: "type", value: value });

    if (validationState.type.isValid) {
      dataDispatch({ type: "type", value: value });
    }
  }

  function handleKey(value) {
    validationDispatch({ type: "key", value: value });

    if (validationState.key.isValid) {
      dataDispatch({ type: "key", value: value });
    }
  }

  function handleBPM(value) {
    validationDispatch({ type: "bpm", value: value });
    dataDispatch({ type: "bpm", value: value });
  }

  function handleLicense(e) {
    e.preventDefault();
    validationDispatch({ type: "license", value: e.target.value });

    if (validationState.license.isValid) {
      dataDispatch({ type: "license", value: e.target.value });
    }
  }

  function handleImage(value) {
    validationDispatch({ type: "image", value: value });

    if (validationState.image.isValid) {
      dataDispatch({ type: "image", value: value });
    }
  }

  function handleAudio(value) {
    validationDispatch({ type: "audio", value: value });

    if (validationState.audio.isValid) {
      dataDispatch({ type: "audio", value: value });
    }
  }

  function handleSubmit() {
    validationDispatch({ type: "name", value: dataState.name });
    validationDispatch({ type: "summary", value: dataState.summary });
    validationDispatch({ type: "type", value: dataState.type });
    validationDispatch({ type: "key", value: dataState.key });
    validationDispatch({ type: "bpm", value: dataState.bpm });
    validationDispatch({ type: "license", value: dataState.license });
    validationDispatch({ type: "image", value: dataState.image });
    validationDispatch({ type: "audio", value: dataState.audio });

    const allFieldsValid = Object.values(validationState).every(
      (field) => field.isValid
    );

    if (allFieldsValid) {
      console.log(dataState);
    } else {
      console.log("Some fields are invalid");
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="create-new-beat-page">
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
        <select className="license-dropdown" onChange={handleLicense}>
          <option value="free">Free</option>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="pro">Pro</option>
        </select>

        <InputBox
          type="file"
          accept="image/*"
          callback={handleImage}
          error={validationState.image}
        ></InputBox>
        <InputBox
          type="file"
          accept="audio/*"
          callback={handleAudio}
          error={validationState.audio}
        ></InputBox>
        <Button type="normal-button" submit={handleSubmit}>
          Create Beat
        </Button>
      </div>
    </>
  );
}
