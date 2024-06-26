import { useParams, useNavigate } from "react-router-dom";
import STYLES from "./QueryPage.module.css";
import QueryBeats from "../components/QueryBeats";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { useKeyboardKey } from "../hooks/useKeyboardKey";
import { toast } from "react-hot-toast";

function QueryPage() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(query);
  const [resultsCount, setResultsCount] = useState(0);
  useKeyboardKey("Enter", () => {
    if (searchQuery.length === 0) {
      toast.error("Please enter a search query");
    } else if (searchQuery.length < 3) {
      toast.error("Please enter a search query with at least 3 characters");
    } else {
      navigate(`/query/${searchQuery}`);
    }
  });
  return (
    <div className={`${STYLES.queryPage}`}>
      <SearchBar onSearchQueryChange={setSearchQuery} defaultQuery={query} />
      <div className={`${STYLES.resultsWrapper}`}>
        <div className={`${STYLES.resultsLength}`}>
          <h2>Found {resultsCount} beats:</h2>
        </div>
        <QueryBeats setResultsCount={setResultsCount} />
      </div>
    </div>
  );
}

export default QueryPage;
