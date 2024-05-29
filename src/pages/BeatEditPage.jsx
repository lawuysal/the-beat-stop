import classes from "./BeatEditPage.module.css";
import NavBar from "../components/NavBar";
import LoadingIndicator from "../components/LoadingIndicator";
import InputBox from "../components/InputBox";
import useBeat from "../hooks/useBeat";

import { useParams } from "react-router-dom";
import Button from "../components/Button";

function EditBeatPage() {
  const { beatId } = useParams();
  const { isBeatLoading, dataState, validationState, handleFunctions } =
    useBeat({ beatId });

  return (
    <>
      <div className={`${classes.editPage}`}>
        {isBeatLoading ? (
          <LoadingIndicator></LoadingIndicator>
        ) : (
          <div>
            <h1>Edit Beat</h1>
            <InputBox
              type="text"
              callback={(val) => handleFunctions.handleName(val)}
              error={validationState.name}
              preText={dataState.name}
            >
              Name:
            </InputBox>
            <InputBox
              type="text"
              callback={(val) => handleFunctions.handleSummary(val)}
              error={validationState.summary}
              preText={dataState.summary}
            >
              Summary:
            </InputBox>
            <InputBox
              type="text"
              callback={(val) => handleFunctions.handleDescription(val)}
              error={validationState.description}
              preText={dataState.description}
            >
              Description:
            </InputBox>
            <InputBox
              type="text"
              callback={(val) => handleFunctions.handleType(val)}
              error={validationState.type}
              preText={dataState.type}
            >
              Types:
            </InputBox>
            <InputBox
              type="text"
              callback={(val) => handleFunctions.handleBPM(val)}
              error={validationState.bpm}
              preText={dataState.bpm}
            >
              BPM:
            </InputBox>
            <InputBox
              type="text"
              callback={(val) => handleFunctions.handleKey(val)}
              error={validationState.key}
              preText={dataState.key}
            >
              Key:
            </InputBox>
            <label>License:</label>
            <select
              className="license-dropdown"
              onChange={handleFunctions.handleLicense}
            >
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="pro">Pro</option>
            </select>
            <label>Avaliable:</label>
            <select
              className="paid-dropdown"
              onChange={handleFunctions.handlePaid}
            >
              <option value="false">Avaliable</option>
              <option value="true">Not Avaliable</option>
            </select>

            <Button
              type="normal-button"
              submit={handleFunctions.handleBeatUpdate}
            >
              Update Beat
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default EditBeatPage;
