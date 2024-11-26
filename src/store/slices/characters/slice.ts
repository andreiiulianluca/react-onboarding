import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacters } from "./thunk";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  location: { name: string; url: string };
};

export type FetchedCharactersData = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type CharactersState = {
  data: FetchedCharactersData | null;
  isLoading: boolean;
  error: string | null;
  pageNumber: number;
};

const initialState: CharactersState = {
  data: null,
  isLoading: false,
  error: null,
  pageNumber: 1,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    resetData(state) {
      state.data = null;
      state.pageNumber = 1;
    },
    incrementPageNumber(state) {
      state.pageNumber = state.pageNumber + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = {
          ...action.payload,
          results: state.data
            ? [...state.data.results, ...action.payload.results]
            : action.payload.results,
        };
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { resetData, incrementPageNumber } = charactersSlice.actions;
export default charactersSlice.reducer;
