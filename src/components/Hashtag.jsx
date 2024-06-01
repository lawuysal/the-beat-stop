import STYLES from "./Hashtag.module.css";

function Hashtag({ children }) {
  if (children.length > 12) {
    children = children.slice(0, 12) + "...";
  }
  return (
    <div className={STYLES.hashtag}>
      <span>#</span>
      <span>{children}</span>
    </div>
  );
}

export default Hashtag;
