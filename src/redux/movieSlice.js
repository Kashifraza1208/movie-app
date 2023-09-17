import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIKey } from "../common/apis/MoiveApiKey";
import movieApi from "../common/apis/movieApi";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (searchText) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${searchText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error; // Rethrow the error to be handled by Redux Toolkit
    }
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (searchText) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${searchText}&type=series`
    );
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieorShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieorShow: (state) => {
      state.selectedMovieorShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, action) => {
      console.log("Fetched Successfully");
      return { ...state, movies: action.payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, action) => {
      console.log("Fetched Successfully");
      return { ...state, shows: action.payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, action) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieorShow: action.payload };
    },
  },
});

export const { removeSelectedMovieorShow } = movieSlice.actions;

export default movieSlice.reducer;
