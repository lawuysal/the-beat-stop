import STYLES from "./../components/NavBar.module.css";
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
    <nav className={STYLES.navbar}>
      <Header>The Beat Stop</Header>
      <ul>
        <NavItem link="/">Home</NavItem>
        <NavItem link="query/the weeknd">Beats</NavItem>
        <NavItem link="/pricing">Pricing</NavItem>
        {/* <NavItem link="#">About</NavItem> */}
      </ul>
      {user ? (
        <div className={STYLES.signedUser}>
          <p className={STYLES.welcomeText}>Welcome, {user.name}</p>
          {avatar && (
            <img
              src={avatar}
              alt={`${user.name} avatar`}
              className={STYLES.roundedAvatar}
              onClick={handleNavigateUserPage}
            />
          )}
          <BsBoxArrowRight
            className={STYLES.signoutIcon}
            onClick={handleSignedOut}
          ></BsBoxArrowRight>
        </div>
      ) : (
        <div className={STYLES.loginButtons}>
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
