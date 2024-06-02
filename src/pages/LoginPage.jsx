import STYLES from "./../pages/LoginPage.module.css";
import Button from "../components/Button";
import InputBox from "../components/InputBox";

import { useState } from "react";
import { serverURLs } from "../util/constans";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useKeyboardKey } from "../hooks/useKeyboardKey";

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  useKeyboardKey("Enter", () => {
    handleSubmit();
  });

  function handleEmailChange(value) {
    setData({ ...data, email: value });
  }
  function handlePasswordChange(value) {
    setData({ ...data, password: value });
  }
  function handleSubmit() {
    fetch(`${serverURLs.USERS_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Logged in successfully");
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/");
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <br />
      <br />
      <div className={STYLES.loginWrapper}>
        <div className={STYLES.login}>
          <h2>Log in</h2>
          <div className={STYLES.dontHave}>
            <h4>Don&apos;t have an account?</h4>
            <Button type="text-button">Sign up</Button>
          </div>

          <InputBox type="email" callback={handleEmailChange}>
            Email
          </InputBox>
          <InputBox type="password" callback={handlePasswordChange}>
            Password
          </InputBox>
          <div className={STYLES.resetPassWrapper}>
            <a href="#">Reset password</a>
          </div>
          <Button type="normal-button" submit={handleSubmit}>
            Log in
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
