import "./../pages/SignupPage.css";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import validator from "validator";
import { toast } from "react-hot-toast";
import { serverURLs } from "../util/constans";

const SignupPage = () => {
  const initialDataState = {
    username: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    membership: "free",
    mailList: false,
  };

  const initialValidationState = {
    username: {
      isValid: false,
      message: "Name must be between 3 and 20 characters",
    },
    name: {
      isValid: false,
      message: "Name must be between 3 and 20 characters",
    },
    email: { isValid: false, message: "Email is not valid" },
    password: { isValid: false, message: "Password is not valid" },
    passwordConfirm: { isValid: false, message: "Passwords do not match" },
    membership: { isValid: true, message: "" },
    mailList: { isValid: true, message: "" },
  };

  const { membership } = useParams();
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);
  const [validationState, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );

  function dataReducer(state, action) {
    switch (action.type) {
      case "username":
        return { ...state, username: action.value };
      case "name":
        return { ...state, name: action.value };
      case "email":
        return { ...state, email: action.value };
      case "password":
        return { ...state, password: action.value };
      case "passwordConfirm":
        return { ...state, passwordConfirm: action.value };
      case "membership":
        return { ...state, membership: action.value };
      case "mailList":
        return { ...state, mailList: action.value };
      default:
        return state;
    }
  }

  function validationReducer(state, action) {
    switch (action.type) {
      case "username":
        return {
          ...state,
          username: {
            isValid: validator.isLength(action.value, { min: 3, max: 20 }),
          },
        };
      case "name":
        return {
          ...state,
          name: {
            isValid: validator.isLength(action.value, { min: 3, max: 20 }),
          },
        };
      case "email":
        return {
          ...state,
          email: {
            isValid: validator.isEmail(action.value),
          },
        };
      case "password":
        return {
          ...state,
          password: {
            isValid: validator.isLength(action.value, { min: 8, max: 20 }),
          },
        };
      case "passwordConfirm":
        return {
          ...state,
          passwordConfirm: {
            isValid: action.value === dataState.password,
          },
        };
      case "membership":
        return { ...state, membership: { isValid: true } };
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

  function handleUsername(value) {
    validationDispatch({ type: "username", value: value });
    dataDispatch({ type: "username", value: value });
  }
  function handleName(value) {
    validationDispatch({ type: "name", value: value });
    dataDispatch({ type: "name", value: value });
  }
  function handleEmail(value) {
    validationDispatch({ type: "email", value: value });
    dataDispatch({ type: "email", value: value });
  }
  function handlePassword(value) {
    validationDispatch({ type: "password", value: value });
    dataDispatch({ type: "password", value: value });
  }
  function handlePasswordConfirm(value) {
    validationDispatch({ type: "passwordConfirm", value: value });
    dataDispatch({ type: "passwordConfirm", value: value });
  }
  function handleMailList(value) {
    validationDispatch({ type: "mailList", value: value });
    dataDispatch({ type: "mailList", value: value });
  }

  async function handleSignup() {
    const payload = {
      username: dataState.username,
      name: dataState.name,
      email: dataState.email,
      password: dataState.password,
      membership: dataState.membership,
      mailList: dataState.mailList,
    };

    if (
      validationState.username.isValid &&
      validationState.name.isValid &&
      validationState.email.isValid &&
      validationState.password.isValid &&
      validationState.passwordConfirm.isValid &&
      validationState.mailList.isValid &&
      validationState.membership.isValid
    ) {
      const res = await fetch(`${serverURLs.USERS_SIGNUP}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Account created successfully");
        localStorage.setItem("token", JSON.stringify(data.token));
      }
    }
  }

  useEffect(
    function () {
      dataDispatch({ type: "membership", value: membership });
    },
    [membership]
  );

  return (
    <>
      <br />
      <br />
      <div className="signup-wrapper">
        <div className="wrapper">
          <div className="signup-create">
            <div className="heading">
              <h2>Sign up</h2>
              <h4>
                Have an account? <a href="#">Log In</a>
              </h4>
            </div>
            <div className="forms">
              <InputBox
                type="text"
                callback={handleUsername}
                error={validationState.username}
              >
                Username:
              </InputBox>
              <InputBox
                type="text"
                callback={handleName}
                error={validationState.name}
              >
                Name:
              </InputBox>
              <InputBox
                type="email"
                callback={handleEmail}
                error={validationState.email}
              >
                Email:
              </InputBox>
              <InputBox
                type="password"
                callback={handlePassword}
                error={validationState.password}
              >
                Password:
              </InputBox>
              <InputBox
                type="password"
                callback={handlePasswordConfirm}
                error={validationState.passwordConfirm}
              >
                Confirm Password:
              </InputBox>
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="get-emails"
                id="chk-1"
                checked={dataState.mailList}
                onChange={(e) => handleMailList(e.target.checked)}
              />
              <p>Get the news, discounts and updates</p>
            </div>
            <Button type="normal-button" submit={handleSignup}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
