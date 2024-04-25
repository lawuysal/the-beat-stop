import NavBar from "../components/NavBar";
import "./../pages/LoginPage.css";
import Button from "../components/Button";

const LoginPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <br />
      <br />
      <div className="login-wrapper">
        <div className="login">
          <h2>Log in</h2>
          <h4>
            Don&apos;t have an account? <a href="#">Sign Up</a>
          </h4>
          <Button text="Continue with Google" type="outlined-button"></Button>
          <Button text="Continue with Facebook" type="outlined-button"></Button>
          <div className="divider">
            <div className="line-break"></div>
            <h4>or</h4>
            <div className="line-break"></div>
          </div>
          <div className="email-text-wrapper">
            <p>Email</p>
          </div>
          <input type="email" className="email-input" />
          <div className="pass-text-wrapper">
            <p>Password</p>
          </div>
          <input type="password" className="pass-input" />
          <div className="reset-pass-wrapper">
            <a href="#">Reset password</a>
          </div>
          <Button text="Log in" type="normal-button"></Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
