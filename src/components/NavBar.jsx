import "./../components/NavBar.css";
import Button from "../components/Button";
import Header from "../components/Header";
import NavItem from "../components/NavItem";
import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function NavBar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  function handleSignedOut() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <Header>The Beat Stop</Header>
      <ul>
        <NavItem link="/">Home</NavItem>
        <NavItem link="/user/beats">Beats</NavItem>
        <NavItem link="/pricing">Pricing</NavItem>
        <NavItem link="#">About</NavItem>
      </ul>
      {user ? (
        <div className="signed-user">
          <p>Welcome, {user.name}</p>
          <BsBoxArrowRight
            className="signout-icon"
            onClick={handleSignedOut}
          ></BsBoxArrowRight>
        </div>
      ) : (
        <div className="login-buttons">
          <Button type="normal-button" submit={() => navigate("/pricing")}>
            Sign Up
          </Button>
          <Button type="outlined-button" submit={() => navigate("/login")}>
            Log In
          </Button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
