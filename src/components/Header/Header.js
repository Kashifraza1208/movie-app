import React, { useState } from "react";
import "./Header.css";
import user from "../../images/user.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMovies, fetchAsyncShows } from "../../redux/movieSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const { isLoading } = useSelector((state) => state.movies);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchText === "") alert("Please search Movies or shows");

    dispatch(fetchAsyncMovies(searchText));
    dispatch(fetchAsyncShows(searchText));

    setSearchText("");
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="text">Movie App</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={searchText}
            placeholder="Search Movies or Shows"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
        {isLoading && <div className="loading-indicator">Loading...</div>}
      </div>
      <div>
        <img src={user} alt="" className="img" />
      </div>
    </div>
  );
};

export default Header;
