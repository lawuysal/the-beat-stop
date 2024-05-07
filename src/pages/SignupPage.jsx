import NavBar from "../components/NavBar";
import "./../pages/SignupPage.css";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { useParams } from "react-router-dom";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { membership } = useParams();

  async function handleSubmit(e) {
    e.preventDefault;

    const postBody = {
      username: username,
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      membership: membership,
    };

    try {
      const res = await fetch("http://127.0.0.1:3001/api/v1/users/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });

      const data = await res.json();
      console.log(data);
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
              <div className="name">
                <InputBox type="text" callback={setFirstName}>
                  First name
                </InputBox>
                <InputBox type="text" callback={setLastName}>
                  Last name
                </InputBox>
              </div>
              <InputBox type="email" callback={setEmail}>
                Email
              </InputBox>
              <InputBox type="password" callback={setPassword}>
                Password
              </InputBox>
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
