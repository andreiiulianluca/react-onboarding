import { createSlice } from "@reduxjs/toolkit";
import { fetchCharactersPerEpisode } from "./thunk";

export type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  location: { name: string; url: string };
};

export type FetchedEpisodeData = {
  name: string;
  airDate: string;
  characters: Character[];
};

type EpisodeState = {
  name: FetchedEpisodeData["name"] | null;
  airDate: FetchedEpisodeData["airDate"] | null;
  characters: FetchedEpisodeData["characters"] | null;
  isLoading: boolean;
  error?: string | null;
};

const initialState: EpisodeState = {
  name: null,
  airDate: null,
  characters: null,
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
        state.error = null;
      })
      .addCase(fetchCharactersPerEpisode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
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
