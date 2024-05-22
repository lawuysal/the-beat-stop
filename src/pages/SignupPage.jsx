import NavBar from "../components/NavBar";
import "./../pages/SignupPage.css";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import validator from "validator";
import { serverURLs } from "../util/constans";

// {
//   "username": "jane_smith",
//   "name": "Jane Smith",
//   "email": "jane.smith@example.com",
//   "password": "password456",
//   "role": "admin",
//   "photo": "images/avatar-002.jpg",
//   "description": "none",
//   "age": "25",
//   "gender": "female",
//   "membership": "premium",
//   "lastMonthSale": false
// }

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const { membership } = useParams();

  async function handleSubmit(e) {
    try {
      e.preventDefault;

      checkValidation();

      if (!isValidUsername) {
        throw new Error("Username is not valid.");
      }
      if (!isValidEmail) {
        throw new Error("Email is not valid.");
      }
      if (!isValidPassword) {
        throw new Error("Password is not valid.");
      }
      if (!isValidName) {
        throw new Error("Name is not valid.");
      }

      const postBody = {
        username: username,
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
        membership: membership,
      };

      const res = await fetch(`${serverURLs.USERS}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      //alert(err.message);
      console.log(err);
    }
  }

  async function checkValidation() {
    setIsValidEmail(false);
    setIsValidName(false);
    setIsValidPassword(false);
    setIsValidUsername(false);
    try {
      // Checks if the username is short, long or dublicate
      if (username.length > 3 && username.length < 16) {
        const usernameRes = await fetch(
          `${serverURLs.USERS}/?username=${username}`
        );

        const usernameData = await usernameRes.json();
        console.log(usernameData.data.users.length > 0);

        if (usernameData.data.users.length > 0) {
          setIsValidUsername(false);
        } else {
          setIsValidUsername(true);
        }
        console.log(isValidUsername);
      }

      // Checks if the email is valid
      if (email.length >= 12) {
        const emailRes = await fetch(`${serverURLs.USERS}/?username=${email}`);
        const emailData = await emailRes.json();
        if (emailData.data.users.length > 0) {
          setIsValidEmail(false);
        } else if (validator.isEmail()) {
          setIsValidEmail(true);
        }

        console.log(isValidEmail);
      }

      if (validator.isStrongPassword()) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }

      if (
        firstName.length > 2 &&
        firstName.length < 25 &&
        lastName.length > 2 &&
        lastName.length < 25
      ) {
        setIsValidName(true);
      } else {
        setIsValidName(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <NavBar></NavBar>
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
              <InputBox type="text" callback={setUsername}>
                Username
              </InputBox>
              {isValidUsername ? (
                <div></div>
              ) : (
                <>
                  <p className="error-text">⛔ Username is not valid.</p>
                  <br />
                </>
              )}
              <div className="name">
                <InputBox type="text" callback={setFirstName}>
                  First name
                </InputBox>
                <InputBox type="text" callback={setLastName}>
                  Last name
                </InputBox>
              </div>
              {isValidName ? (
                <div></div>
              ) : (
                <>
                  <p className="error-text">⛔ Name is not valid.</p>
                  <br />
                </>
              )}
              <>
                <InputBox type="email" callback={setEmail}>
                  Email
                </InputBox>
                {isValidEmail ? (
                  <div></div>
                ) : (
                  <>
                    <p className="error-text">⛔ Email is not valid.</p>
                    <br />
                  </>
                )}
              </>
              <>
                <InputBox type="password" callback={setPassword}>
                  Password
                </InputBox>
                {isValidPassword ? (
                  <div></div>
                ) : (
                  <>
                    <p className="error-text">⛔ Password is not valid.</p>
                    <br />
                  </>
                )}
              </>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" name="get-emails" id="chk-1" />
              <p>Get the news, discounts and updates</p>
            </div>
            <Button type="normal-button" submit={handleSubmit}>
              Sign up
            </Button>
          </div>
          {/* <div className="signup-google">
            <div className="heading">
              <h2>Sign up</h2>
              <h4>
                Have an account? <a href="#">Log In</a>
              </h4>
            </div>
            <Button type="outlined-button">Continue with Google</Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SignupPage;
