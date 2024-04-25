import "./../components/NavItem.css";
import { Link } from "react-router-dom";

const NavItem = ({ text, link }) => {
  return (
    <li>
      {/* <a href={link} className="nav-item">
        {text}
      </a> */}
      <Link to={link} className="nav-item">
        {text}
      </Link>
    </li>
  );
};

export default NavItem;
