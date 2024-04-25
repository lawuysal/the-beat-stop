import NavBar from "../components/NavBar";
import "./../pages/SignupPage.css";
import Button from "../components/Button";

const SignupPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <br />
      <br />
      <div className="signup-wrapper">
        <div className="signup">
          <h2>Sign up</h2>
          <h4>
            Have an account? <a href="#">Log In</a>
          </h4>
          <Button text="Continue with Google" type="outlined-button"></Button>
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
          <div className="checkbox-wrapper">
            <input type="checkbox" name="get-emails" id="chk-1" />
            <p>Get the news, discounts and updates</p>
          </div>
          <Button text="Log in" type="normal-button"></Button>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
