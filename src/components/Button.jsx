import STYLES from "./../components/Button.module.css";

function Button({ children, type, submit }) {
  function handleStyles() {
    switch (type) {
      case "normal-button":
        return STYLES.normalButton;
      case "outlined-button":
        return STYLES.outlinedButton;
      case "text-button":
        return STYLES.textButton;
      default:
        return STYLES.normalButton;
    }
  }

  return (
    <button className={handleStyles()} onClick={(e) => submit?.(e)}>
      {children}
    </button>
  );
}

export default Button;
