import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacters } from "./thunk";
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
  error: "",
  pageNumber: 1,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    incrementPageNumber(state) {
      state.pageNumber += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";

        if (action.meta.arg.pageNumber === 1) {
          state.characters = action.payload.results;
        } else {
          state.characters = state.characters
            ? [...state.characters, ...action.payload.results]
            : action.payload.results;
        }

        state.info = action.payload.info;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { incrementPageNumber } = charactersSlice.actions;
export default charactersSlice.reducer;
