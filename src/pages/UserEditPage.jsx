import { UserContext } from "../context/userContext";
import { useContext } from "react";
import STYLES from "./UserEditPage.module.css";
import { useState, useEffect, useReducer } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import validator from "validator";
import { toast } from "react-hot-toast";
import { serverURLs } from "../util/constans";
import { useNavigate } from "react-router-dom";

export default function UserEditPage() {
  const initialDataState = {
    name: "",
    username: "",
    description: "",
    membership: "",
    mailList: false,
  };

  const initialValidationState = {
    name: { isValid: true, message: "Name can't be empty" },
    username: { isValid: true, message: "Username can't be empty" },
    description: { isValid: true, message: "" },
    membership: { isValid: true, message: "" },
    mailList: { isValid: true, message: "" },
  };

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);
  const [validationData, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );

  function dataReducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.value };
      case "username":
        return { ...state, username: action.value };
      case "description":
        return { ...state, description: action.value };
      case "membership":
        return { ...state, membership: action.value };
      case "mailList":
        return { ...state, mailList: action.value };
      case "getUserData":
        return {
          ...state,
          name: user.name,
          username: user.username,
          description: user.description,
          membership: user.membership,
          mailList: user.mailList,
        };
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
      case "username":
        return {
          ...state,
          username: {
            isValid: validator.isLength(action.value, { min: 3, max: 20 }),
          },
        };
      case "description":
        return {
          ...state,
          description: {
            isValid: true,
          },
        };
      case "membership":
        return {
          ...state,
          membership: {
            isValid: validator.isIn(action.value, ["free", "pro", "premium"]),
          },
        };
      case "mailList":
        return {
          ...state,
          mailList: {
            isValid: action.value === true || action.value === false,
          },
        };
      default:
        return state;
    }
  }

  function handleNameChange(name) {
    dataDispatch({ type: "name", value: name });
    validationDispatch({ type: "name", value: name });
  }
  function handleUsernameChange(username) {
    dataDispatch({ type: "username", value: username });
    validationDispatch({ type: "username", value: username });
  }
  function handleDescriptionChange(description) {
    dataDispatch({ type: "description", value: description });
    validationDispatch({ type: "description", value: description });
  }
  function handleMembershipChange(e) {
    dataDispatch({ type: "membership", value: e.target.value });
    validationDispatch({ type: "membership", value: e.target.value });
  }
  function handleMailListChange(e) {
    dataDispatch({ type: "mailList", value: e.target.value });
    validationDispatch({ type: "mailList", value: e.target.value });
  }
  function handleUpdateRequest() {
    const isDataValid = Object.values(validationData).every(
      (item) => item.isValid
    );

    if (isDataValid) {
      fetch(`${serverURLs.USERS_EDIT_MAIN}/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataState),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            console.log(data);
            toast.success("Profile updated successfully");
            setUser(null);
            setTimeout(() => {
              navigate(`/profile/user`);
            }, 500);
          } else {
            toast.error(data.message);
          }
        });
    } else {
      toast.error("Profile update failed");
    }
  }

  useEffect(() => {
    if (user) {
      dataDispatch({ type: "getUserData" });
      setIsUserLoading(false);
    }
  }, [user]);

  if (isUserLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={STYLES.editPage}>
      <h1>Edit Profile:</h1>
      <div className={STYLES.namesWrapper}>
        <InputBox
          type="text"
          callback={handleNameChange}
          error={validationData.name}
          preText={dataState.name}
        >
          Name:
        </InputBox>
        <InputBox
          type="text"
          callback={handleUsernameChange}
          error={validationData.username}
          preText={dataState.username}
        >
          Username:
        </InputBox>
      </div>
      <InputBox
        type="text"
        callback={handleDescriptionChange}
        error={validationData.description}
        preText={dataState.description}
      >
        Description:
      </InputBox>
      <div className={STYLES.comboWrapper}>
        <div className={STYLES.membershipWrapper}>
          <label className={STYLES.labelWrapper}>Membership:</label>
          <select
            onChange={handleMembershipChange}
            value={dataState.membership}
            className={STYLES.comboBox}
          >
            <option value="free">Free</option>
            <option value="standar">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div className={STYLES.membershipWrapper}>
          <label className={STYLES.labelWrapper}>Mail List:</label>
          <select
            onChange={handleMailListChange}
            value={dataState.mailList}
            className={STYLES.comboBox}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div className={STYLES.buttonWrapper}>
        <Button type="normal-button" submit={handleUpdateRequest}>
          Update Profile
        </Button>
      </div>
    </div>
  );
}
