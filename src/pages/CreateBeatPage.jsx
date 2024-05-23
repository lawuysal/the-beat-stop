import("./CreateBeatPage.css");
import NavBar from "../components/NavBar";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

import { useReducer } from "react";

export default function CreateBeatPage() {
  const initialState = {
    name: "",
    summary: "",
    type: "",
    key: "",
    bpm: "",
    license: "free",
    image: "",
    audio: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
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

  function handleName(value) {
    dispatch({ type: "name", value: value });
  }

  function handleSummary(value) {
    dispatch({ type: "summary", value: value });
  }

  function handleType(value) {
    dispatch({ type: "type", value: value });
  }

  function handleKey(value) {
    dispatch({ type: "key", value: value });
  }

  function handleBPM(value) {
    dispatch({ type: "bpm", value: value });
  }

  function handleLicense(e) {
    e.preventDefault();
    dispatch({ type: "license", value: e.target.value });
  }

  function handleImage(value) {
    dispatch({ type: "image", value: value });
  }

  function handleAudio(value) {
    dispatch({ type: "audio", value: value });
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="create-new-beat-page">
        <h1>Create a New Beat</h1>
        <InputBox type="text" callback={(val) => handleName(val)}>
          Name
        </InputBox>
        <InputBox type="text" callback={handleSummary}>
          Summary
        </InputBox>
        <InputBox type="text" callback={handleType}>
          Type
        </InputBox>
        <InputBox type="text" callback={handleKey}>
          Key
        </InputBox>
        <InputBox type="text" callback={handleBPM}>
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
        ></InputBox>
        <InputBox
          type="file"
          accept="audio/*"
          callback={handleAudio}
        ></InputBox>
        <Button type="normal-button" submit={() => console.log(state)}>
          Create Beat
        </Button>
      </div>
    </>
  );
}
