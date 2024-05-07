import "./../components/NavItem.css";
import { Link } from "react-router-dom";

const NavItem = ({ children, link }) => {
  return (
    <li>
      {/* <a href={link} className="nav-item">
        {text}
      </a> */}
      <Link to={link} className="nav-item">
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
