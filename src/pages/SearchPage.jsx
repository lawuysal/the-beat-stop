import { useParams } from "react-router-dom";
import styles from "./SearchPage.module.css";

function SearchPage() {
  const { query } = useParams();
  return (
    <div className={`${styles.searchPage}`}>
      <h1>Search Page</h1>
      <p>{query}</p>
    </div>
  );
}

export default SearchPage;
