import { createSlice } from "@reduxjs/toolkit";
import { fetchCharactersPerEpisode } from "./thunk";
import { Character } from "../../../types/types";

export type FetchedEpisode = {
  name: string;
  airDate: string;
  characters: Character[];
};

type EpisodeState = {
  name?: FetchedEpisode["name"];
  airDate?: FetchedEpisode["airDate"];
  characters?: FetchedEpisode["characters"];
  isLoading: boolean;
  error?: string;
};

const initialState: EpisodeState = {
  name: undefined,
  airDate: undefined,
  characters: undefined,
  isLoading: false,
  error: "",
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersPerEpisode.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchCharactersPerEpisode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.characters = action.payload.characters;
        state.name = action.payload.name;
        state.airDate = action.payload.airDate;
      })
      .addCase(fetchCharactersPerEpisode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default episodeSlice.reducer;
