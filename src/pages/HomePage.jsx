import "./../pages/HomePage.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import AudioPlayer from "../components/AudioPlayer";

function MainPage() {
  return (
    <>
      <NavBar></NavBar>
      <div className="slogan">
        <br />

        <h1>Search and Find The Beats</h1>
        <h1>That Fit Your Style</h1>
      </div>
      <br />
      <br />
      <SearchBar></SearchBar>
      <AudioPlayer></AudioPlayer>
    </>
  );
}

export default MainPage;
