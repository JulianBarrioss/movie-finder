import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetData } from "../hooks/useGetData";
import { Movie } from "../components/Movie";
import "../styles/containers/TrendingSection.css";

const TrendingSection = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    useGetData(`trending/movie/day`, setTrendingMovies, "results");
  }, []);

  return (
    <>
      <section id="trendingPreview" className="trendingPreview-container">
        <div className="trendingPreview-header">
          <h2 className="trendingPreview-title">Trending</h2>
          <Link to="/trending">
            <button className="trendingPreview-btn">More</button>
          </Link>
        </div>

        <article className="trendingPreview-movieList">
          {trendingMovies.map((movie, index) => (
            <Movie movie={movie} key={index} index={index} />
          ))}
        </article>
      </section>
    </>
  );
};

export { TrendingSection };
