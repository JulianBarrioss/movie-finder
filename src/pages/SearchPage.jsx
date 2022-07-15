import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { API_KEY } from "../secrets";
import { useGetData } from "../hooks/useGetData";
import { AppContext } from "../context/AppContext";
import { Movie } from "../components/Movie";

const SearchPage = () => {
  const { searchState, setSearchState } = useContext(AppContext);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [value, setValue] = useState("");

  const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    params: {
      api_key: API_KEY,
    },
  });
  let page = 1;

  async function getPaginatedMoviesByCategory() {
    page++;
    const { data } = await api(`search/movie?query=${searchState}`, {
      params: {
        page,
      },
    });
    const movies = data.results;
    setSearchedMovies((oldMovies) => [...oldMovies, ...movies]);
  }

  const handleScroll = (e) => {
    const windowHeight = window.innerHeight;
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;

    if (windowHeight + scrollTop + 1 >= scrollHeight) {
      console.log(scrollTop);
      window.scrollTo(0, scrollTop - 498);
      getPaginatedMoviesByCategory();
    }
  };

  useEffect(() => {
    useGetData(
      `search/movie?query=${searchState}`,
      setSearchedMovies,
      "results"
    );
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header id="header" className="header-container">
        <Link to="/">
          <span className="header-arrow ">&lt;</span>
        </Link>
        <form id="searchForm" className="header-searchForm">
          <input
            type="text"
            placeholder="Vengadores"
            onChange={(event) => setValue(event.target.value)}
          />

          <Link to={`/search:${searchState}`}>
            <button onClick={() => setSearchState(value)}>
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </Link>
        </form>
      </header>

      <section id="genericList" className="genericList-container">
        {searchedMovies.map((movie, index) => (
          <Movie movie={movie} key={index} />
        ))}
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
        <div className="skeleton-container"></div>
      </section>
    </>
  );
};

export { SearchPage };
