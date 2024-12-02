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
  location: { name: string };
  dimension: string;
  type: string;
};

type LocationState = {
  data: FetchedLocationData | null;
  isLoading: boolean;
  error?: string;
};

const initialState: LocationState = {
  data: null,
  isLoading: false,
  error: "",
};

const locationsSlice = createSlice({
  name: "locationsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersPerLocation.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCharactersPerLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchCharactersPerLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = action.payload;
      });
  },
});

export default locationsSlice.reducer;
