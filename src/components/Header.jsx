import STYLES from "./../components/Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <header className={STYLES.headerText} onClick={() => navigate("/")}>
      {children}
    </header>
  );
};

export default Header;
