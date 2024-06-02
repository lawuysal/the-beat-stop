import STYLES from "./BeatEditPage.module.css";
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
      <div className={STYLES.editPageWrapper}>
        <div className={STYLES.editPage}>
          {isBeatLoading ? (
            <LoadingIndicator></LoadingIndicator>
          ) : (
            <>
              <div className={STYLES.gridRow2}>
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
              </div>
              <div className={STYLES.gridRow2}>
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
              </div>
              <div className={STYLES.gridRow2}>
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
              </div>
              <div className={STYLES.gridRow2}>
                <div className={STYLES.membershipWrapper}>
                  <label className={STYLES.labelWrapper}>License:</label>
                  <select
                    className={STYLES.comboBox}
                    onChange={handleFunctions.handleLicense}
                  >
                    <option value="free">Free</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="pro">Pro</option>
                  </select>
                </div>
                <div className={STYLES.membershipWrapper}>
                  <label className={STYLES.labelWrapper}>Avaliable:</label>
                  <select
                    className={STYLES.comboBox}
                    onChange={handleFunctions.handlePaid}
                  >
                    <option value="false">Avaliable</option>
                    <option value="true">Not Avaliable</option>
                  </select>
                </div>
              </div>

              <div className={STYLES.buttonWrapper}>
                <Button
                  type="normal-button"
                  submit={handleFunctions.handleBeatUpdate}
                >
                  Update Beat
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EditBeatPage;
