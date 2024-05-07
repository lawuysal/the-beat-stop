import "./../components/NavBar.css";
import Button from "../components/Button";
import Header from "../components/Header";
import NavItem from "../components/NavItem";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <Header>The Beat Stop</Header>
      <ul>
        <NavItem link="/">Home</NavItem>
        <NavItem link="#">Beats</NavItem>
        <NavItem link="/pricing">Pricing</NavItem>
        <NavItem link="#">About</NavItem>
      </ul>
      <div className="login-buttons">
        <Button type="normal-button" submit={() => navigate("/pricing")}>
          Sign Up
        </Button>
        <Button type="outlined-button" submit={() => navigate("/login")}>
          Log In
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
