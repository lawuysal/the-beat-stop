import "./../components/Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ text }) => {
  const navigate = useNavigate();
  return (
    <header className="header-text" onClick={() => navigate("/")}>
      {text}
    </header>
  );
};

export default Header;
