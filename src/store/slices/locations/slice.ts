import { createSlice } from "@reduxjs/toolkit";
import { fetchCharactersPerLocation } from "./thunk";

type Character = {
  id: number;
  name: string;
  location: { name: string; url: string };
  image: string;
  status: string;
};

export type FetchedLocationData = {
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
  info: FetchedLocationData["info"] | null;
  location: FetchedLocationData["location"] | null;
  type: FetchedLocationData["type"] | null;
  characters: Character[] | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: LocationState = {
  info: null,
  location: null,
  type: null,
  characters: null,
  isLoading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: "locationsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersPerLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharactersPerLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchCharactersPerLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.characters = action.payload.characters;
        state.location = action.payload.location;
        state.type = action.payload.type;
      });
  },
});

export default locationsSlice.reducer;
