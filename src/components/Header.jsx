import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppContext";

import "../styles/components/Header.css";

const Header = () => {
  const { searchState, setSearchState } = useContext(AppContext);

  return (
    <>
      <header id="header" className="header-container">
        <h2>The Movie DB</h2>
        <form id="searchForm" className="header-searchForm">
          <input
            type="text"
            placeholder="search a movie"
            onChange={(event) => setSearchState(event.target.value)}
          />

          <Link to={`/search:${searchState}`}>
            <button>
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </Link>
        </form>
      </header>
    </>
  );
};

export { Header };
