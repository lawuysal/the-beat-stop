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
      <Header text="The Beat Stop"></Header>
      <ul>
        <NavItem text="Home" link="/"></NavItem>
        <NavItem text="Beats" link="#"></NavItem>
        <NavItem text="Pricing" link="/pricing"></NavItem>
        <NavItem text="About" link="#"></NavItem>
      </ul>
      <div className="login-buttons">
        <Button text="Sign Up" type="normal-button" link="/signup"></Button>
        <Button text="Log In" type="outlined-button" link="/login"></Button>
      </div>
    </nav>
  );
};

export default NavBar;
