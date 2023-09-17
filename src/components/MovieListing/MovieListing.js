import React from "react";
import "./MovieListing.css";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import Slider from "react-slick";
import { Settings } from "../../common/Settings";

const MovieListing = () => {
  const { movies } = useSelector((state) => state.movies);
  const { shows } = useSelector((state) => state.movies);

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...Settings}>
            {movies.Response === "True" ? (
              movies.Search.map((movie, index) => (
                <MovieCard key={index} data={movie} />
              ))
            ) : (
              <div className="movie-error">
                <h3 className="movieError">{movies.Error}</h3>
              </div>
            )}
          </Slider>
        </div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="show-container">
          <Slider {...Settings}>
            {shows.Response === "True" ? (
              shows.Search.map((show, index) => (
                <MovieCard key={index} data={show} />
              ))
            ) : (
              <div className="show-error">
                <h3 className="movieError">{shows.Error}</h3>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
