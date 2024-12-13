import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacters, fetchMoreCharacters } from "./thunk";
import { Character } from "../../../types/types";

export type FetchedCharacters = {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: Character[];
};

export type CharactersState = {
  info?: FetchedCharacters["info"];
  characters?: Character[];
  isLoading: boolean;
  error?: string;
  pageNumber: number;
};

const initialState: CharactersState = {
  isLoading: false,
  error: undefined,
  pageNumber: 1,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.characters = action.payload.results;
        state.info = action.payload.info;
        state.pageNumber = 1;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Something went wrong";
        state.characters = [];
      })
      .addCase(fetchMoreCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchMoreCharacters.fulfilled, (state, action) => {
        state.isLoading = false;

        state.characters = state.characters
          ? [...state.characters, ...action.payload.results]
          : action.payload.results;

        state.info = action.payload.info;
        state.pageNumber += 1;
      })
      .addCase(fetchMoreCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export default charactersSlice.reducer;
