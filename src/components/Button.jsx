import "./../components/Button.css";

function Button({ children, type, submit }) {
  return (
    <button className={type} onClick={(e) => submit?.(e)}>
      {children}
    </button>
  );
}

export default Button;
