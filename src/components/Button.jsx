import "./../components/Button.css";
import { useNavigate } from "react-router-dom";

function Button({ text, type, link }) {
  const navigate = useNavigate();
  return (
    <input
      type="button"
      value={text}
      className={type}
      onClick={() => navigate(link)}
    />
  );
}

export default Button;
