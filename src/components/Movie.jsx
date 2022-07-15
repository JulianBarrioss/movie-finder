import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import "../styles/components/Movie.css";

const Movie = ({ movie, index }) => {
  const { setMovieState } = useContext(AppContext);
  return (
    <Link to={`/movie:${movie.title}`}>
      <div
        className="movie-container"
        onClick={() => {
          setMovieState(movie.id);
        }}
      >
        {index > 2 ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="movie-img"
            loading="lazy"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="movie-img"
          />
        )}
      </div>
    </Link>
  );
};

export { Movie };
