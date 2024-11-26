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
  id: number;
  episode_name: string;
  air_date: string;
  characters: Character[];
};

type EpisodeState = {
  data: FetchedEpisodeData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: EpisodeState = {
  data: null,
  isLoading: false,
  error: null,
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    resetData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersPerEpisode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharactersPerEpisode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCharactersPerEpisode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { resetData } = episodeSlice.actions;
export default episodeSlice.reducer;
