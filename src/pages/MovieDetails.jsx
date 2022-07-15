import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { API_KEY } from "../secrets";
import axios from "axios";
import { useGetData, useGetServices } from "../hooks/useGetData";
import { AppContext } from "../context/AppContext";
import { Movie } from "../components/Movie";
import "../styles/pages/MovieDetail.css";

const MovieDetails = () => {
  const { movieState } = useContext(AppContext);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [streamingServices, setStreamingServices] = useState({
    flatrate: [],
  });
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    vote: 0,
    overview: "",
    genres: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    useGetData(`movie/${movieState}/similar`, setRelatedMovies, "results");
    useGetServices(
      `movie/${movieState}/watch/providers`,
      setStreamingServices,
      "results"
    );
    console.log(streamingServices);
    const getData = async () => {
      const api = axios.create({
        baseURL: "https://api.themoviedb.org/3/",
        params: {
          api_key: API_KEY,
        },
      });
      const { data } = await api.get(`movie/${movieState}`);
      setMovieInfo({
        title: data.original_title,
        vote: data.vote_average,
        overview: data.overview,
        genres: data.genres,
        image: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      });
    };

    getData();
  }, [movieState]);

  return (
    <>
      <header
        id="header"
        className="header-container header-container--long .header-container--categoryView"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(" +
            movieInfo.image +
            ")",
        }}
      ></header>

      <picture className="header-image">
        <img src={movieInfo.image} alt="" />
      </picture>
      <section id="movieDetail" className="movieDetail-container">
          <span className="header-arrow " onClick={() => navigate(-1)}>&lt;</span>
        <h1 className="movieDetail-title">{movieInfo.title}</h1>
        <span className="movieDetail-score">{movieInfo.vote}</span>
        <p className="movieDetail-description">{movieInfo.overview}</p>

        <article className="categories-list">
          {movieInfo.genres.map((genre, index) => (
            <div className="category-container" key={index}>
              <h3 id={`id${genre.id}`} className="category-title">
                {genre.name}
              </h3>
            </div>
          ))}
        </article>

        <div>
          {streamingServices.flatrate.length === 0 ? (
            <p>No Streaming Aviable</p>
          ) : (
            streamingServices.flatrate.map((service, index) => (
              <img
                className="service-logo"
                alt={service.provider_name}
                key={index}
                src={`https://image.tmdb.org/t/p/w300${service.logo_path}`}
              />
            ))
          )}
        </div>

        <article className="relatedMovies-container">
          <h2 className="relatedMovies-title">Películas similares</h2>

          <div className="relatedMovies-scrollContainer">
            {relatedMovies.map((movie, index) => (
              <Movie movie={movie} key={index} />
            ))}
          </div>
        </article>
      </section>
    </>
  );
};

export { MovieDetails };
