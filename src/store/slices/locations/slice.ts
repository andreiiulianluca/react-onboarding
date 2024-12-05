import { createSlice } from "@reduxjs/toolkit";
import { fetchCharactersPerLocation } from "./thunk";
import { Character } from "../../../types/types";

export type FetchedLocation = {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  characters: Character[];
  location: { name: string; dimension: string };
  type: string;
};

type LocationState = {
  info?: FetchedLocation["info"];
  location?: FetchedLocation["location"];
  type?: FetchedLocation["type"];
  characters?: Character[];
  isLoading: boolean;
  error?: string;
};

const initialState: LocationState = {
  info: undefined,
  location: undefined,
  type: undefined,
  characters: undefined,
  isLoading: false,
  error: undefined,
};

const locationsSlice = createSlice({
  name: "locationsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersPerLocation.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchCharactersPerLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchCharactersPerLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.characters = action.payload.characters;
        state.location = action.payload.location;
        state.type = action.payload.type;
      });
  },
});

export default locationsSlice.reducer;
