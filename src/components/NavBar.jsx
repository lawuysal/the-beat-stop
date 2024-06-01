import "./../components/NavBar.css";
import Button from "../components/Button";
import Header from "../components/Header";
import NavItem from "../components/NavItem";
import { convertPath } from "./../util/convertPath";
import { serverURLs } from "./../util/constans";
import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext, useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";

function NavBar() {
  const navigate = useNavigate();
  const { user, isUserLoading } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  function handleSignedOut() {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }

  function handleNavigateUserPage() {
    navigate(`/profile/user`);
  }

  function handleBeatsButton() {
    if (user) {
      return "/user/beats";
    } else {
      return "/query/the weeknd";
    }
  }

  useEffect(() => {
    if (user && user.photo) {
      setAvatar(
        `${serverURLs.USER_IMAGES}/${convertPath(user.photo, "userPhoto")}`
      );
    }
  }, [user]);

  if (isUserLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <nav className="navbar">
      <Header>The Beat Stop</Header>
      <ul>
        <NavItem link="/">Home</NavItem>
        <NavItem link={handleBeatsButton()}>Beats</NavItem>
        <NavItem link="/pricing">Pricing</NavItem>
        <NavItem link="#">About</NavItem>
      </ul>
      {user ? (
        <div className="signed-user">
          <p>Welcome, {user.name}</p>
          {avatar && (
            <img
              src={avatar}
              alt={`${user.name} avatar`}
              className="rounded-avatar"
              onClick={handleNavigateUserPage}
            />
          )}
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
