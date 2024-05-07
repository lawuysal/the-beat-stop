import "./../components/Button.css";
import { useNavigate } from "react-router-dom";

function Button({ children, type, link }) {
  const navigate = useNavigate();
  return (
    <button className={type} onClick={() => navigate(link)}>
      {children}
    </button>
  );
}

export default Button;
