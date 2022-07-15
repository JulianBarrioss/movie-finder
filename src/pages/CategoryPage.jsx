import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { API_KEY } from "../secrets";

import { AppContext } from "../context/AppContext";
import { useGetData } from "../hooks/useGetData";
import { Movie } from "../components/Movie";
import "../styles/pages/CategoryPage.css";

const CategoryPage = () => {
  const { categoryState } = useContext(AppContext);
  const [categoryMovies, setCategoryMovies] = useState([]);

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

  async function getPaginatedMoviesByCategory(id) {
    page++;
    const { data } = await api("discover/movie", {
      params: {
        with_genres: id,
        page,
      },
    });
    const movies = data.results;
    setCategoryMovies((oldMovies) => [...oldMovies, ...movies]);
  }

  const handleScroll = (e) => {
    const windowHeight = window.innerHeight;
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;

    if (windowHeight + scrollTop + 1 >= scrollHeight) {
      console.log(scrollTop);
      window.scrollTo(0, scrollTop - 498);
      getPaginatedMoviesByCategory(categoryState);
    }
  };

  useEffect(() => {
    useGetData(
      `discover/movie?with_genres=${categoryState.id}`,
      setCategoryMovies,
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
        <h1 className="header-title header-title--categoryView">
          {categoryState.name}
        </h1>
      </header>

      <section id="genericList" className="genericList-container">
        {categoryMovies.map((movie, index) => (
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

export { CategoryPage };
