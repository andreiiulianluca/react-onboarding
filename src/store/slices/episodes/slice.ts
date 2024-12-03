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
  episodeName: string;
  airDate: string;
  characters: Character[];
};

type EpisodeState = {
  data: FetchedEpisodeData | null;
  isLoading: boolean;
  error?: string;
};

const initialState: EpisodeState = {
  data: null,
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
        state.error = "";
      })
      .addCase(fetchCharactersPerEpisode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(fetchCharactersPerEpisode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default episodeSlice.reducer;
