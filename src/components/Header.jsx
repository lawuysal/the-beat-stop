import "./../components/Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <header className="header-text" onClick={() => navigate("/")}>
      {children}
    </header>
  );
};

export default Header;
