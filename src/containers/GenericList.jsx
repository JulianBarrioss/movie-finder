import React from "react";

import '../styles/containers/GenericList.css'

const GenericList = () => {
  return (
    <>
      <section id="genericList" className="genericList-container inactive">
        <div className="movie-container">
          <img
            src="https://image.tmdb.org/t/p/w300/adOzdWS35KAo21r9R4BuFCkLer6.jpg"
            className="movie-img"
            alt="Nombre de la película"
          />
        </div>

        <div className="movie-container">
          <img
            src="https://image.tmdb.org/t/p/w300/adOzdWS35KAo21r9R4BuFCkLer6.jpg"
            className="movie-img"
            alt="Nombre de la película"
          />
        </div>

        <div className="movie-container">
          <img
            src="https://image.tmdb.org/t/p/w300/adOzdWS35KAo21r9R4BuFCkLer6.jpg"
            className="movie-img"
            alt="Nombre de la película"
          />
        </div>
      </section>
    </>
  );
};

export { GenericList };
