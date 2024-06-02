import STYLES from "./../pages/HomePage.module.css";
import SearchBar from "../components/SearchBar";
import AudioPlayer from "../components/AudioPlayer";
import { useKeyboardKey } from "../hooks/useKeyboardKey";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
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
    <>
      <div className={STYLES.slogan}>
        <h1>Search and Find The Beats</h1>
        <h1>That Fit Your Style</h1>
      </div>
      <br />
      <br />
      <SearchBar onSearchQueryChange={setSearchQuery}></SearchBar>
      <AudioPlayer></AudioPlayer>
    </>
  );
}

export default MainPage;
