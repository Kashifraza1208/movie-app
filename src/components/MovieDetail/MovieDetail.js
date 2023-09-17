import React, { useEffect } from "react";
import "./MovieDetail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  removeSelectedMovieorShow,
} from "../../redux/movieSlice";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const { selectedMovieorShow } = useSelector((state) => state.movies);
  console.log(selectedMovieorShow);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieorShow());
    };
  }, [dispatch, imdbID]);

  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="movie-section">
      {Object.keys(selectedMovieorShow).length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {" "}
          <div className="section-left">
            <div className="movie-title">{selectedMovieorShow?.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i className="fa fa-star" aria-hidden="true"></i> :{" "}
                {""}
                {selectedMovieorShow.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {selectedMovieorShow.imdbVotes}
              </span>{" "}
              <span>
                Runtime <i className="fa fa-film" aria-hidden="true"></i> : {""}
                {selectedMovieorShow.Runtime}
              </span>{" "}
              <span>
                Year <i className="fa fa-calendar" aria-hidden="true"></i> :{" "}
                {""}
                {selectedMovieorShow.Year}
              </span>
            </div>
            <div className="movie-plot">{selectedMovieorShow.Plot}</div>
            <div className="movie-info">
              <div>
                <span className="moviespan">Director</span>
                <span>{selectedMovieorShow.Director}</span>
              </div>
              <div>
                <span className="moviespan">Starts</span>
                <span>{selectedMovieorShow.Actors}</span>
              </div>
              <div>
                <span className="moviespan">Generes</span>
                <span>{selectedMovieorShow.Genre}</span>
              </div>
              <div>
                <span className="moviespan">Language</span>
                <span>{selectedMovieorShow.Language}</span>
              </div>
              <div>
                <span className="moviespan">Awards</span>
                <span>{selectedMovieorShow.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img
              src={selectedMovieorShow.Poster}
              alt={selectedMovieorShow.Poster?.title}
            />

            <span
              className="downloadButton"
              onClick={() => openNewTab("https://m.vegamovies.im/")}
            >
              Download
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
