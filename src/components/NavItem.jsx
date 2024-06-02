import STYLES from "./../components/NavItem.module.css";
import { Link } from "react-router-dom";

const NavItem = ({ children, link }) => {
  return (
    <li>
      <Link to={link} className={STYLES.navItem}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
