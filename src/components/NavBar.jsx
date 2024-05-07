import "./../components/NavBar.css";
{
  /* <Link to={`contacts/1`}>Your Name</Link> */
}

import Button from "../components/Button";
import Header from "../components/Header";
import NavItem from "../components/NavItem";

const NavBar = () => {
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
        <Button type="normal-button" link="/signup">
          Sign Up
        </Button>
        <Button text="Log In" type="outlined-button" link="/login">
          Log In
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
