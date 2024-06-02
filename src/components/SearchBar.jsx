import STYLES from "./../components/SearchBar.module.css";
import { useEffect, useRef, useState } from "react";

const SearchBar = ({ onSearchQueryChange, defaultQuery }) => {
  const searchBarRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(defaultQuery || "");

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
    onSearchQueryChange?.(e.target.value);
  }

  useEffect(function () {
    searchBarRef.current.focus();
  }, []);

  return (
    <div className={STYLES.searchbar}>
      <div className={STYLES.searchbarWrapper}>
        <div className={STYLES.searchbarLeft}>
          <div className={STYLES.searchIconWrapper}>
            <span className={`${STYLES.searchIcon} ${STYLES.searchbarIcon}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </span>
          </div>
        </div>

        <div className={STYLES.searchbarCenter}>
          <div className={STYLES.searchbarInputSpacer}></div>

          <input
            value={searchQuery}
            onChange={handleSearchQueryChange}
            type="text"
            className={STYLES.searchbarInput}
            maxLength="2048"
            name="q"
            autoCapitalize="off"
            autoComplete="off"
            title="Search"
            role="combobox"
            placeholder="Search Artists, Styles, Producers..."
            ref={searchBarRef}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
