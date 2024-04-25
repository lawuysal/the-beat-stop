import "./../pages/HomePage.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

function MainPage() {
  return (
    <>
      <NavBar></NavBar>
      <div className="slogan">
        <br />

        <h1>Search and Find The Beats</h1>
        <h1>That Fits Your Style</h1>
      </div>
      <br />
      <br />
      <SearchBar></SearchBar>
    </>
  );
}

export default MainPage;
