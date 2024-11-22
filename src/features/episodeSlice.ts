import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  location: { name: string; url: string };
};

type FetchedEpisodeData = {
  id: number;
  episode_name: string;
  air_date: string;
  characters: Character[];
};

export const fetchCharactersPerEpisode = createAsyncThunk<
  FetchedEpisodeData,
  number
>("episode/fetchCharactersPerEpisode", async (episodeId) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeId}`
  );

  if (!response.ok) throw new Error("Failed to fetch episode data");

  const episodeData = await response.json();

  const characterPromises = episodeData.characters.map((characterUrl: string) =>
    fetch(characterUrl).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch character data");
      return res.json();
    })
  );

  const characters: Character[] = await Promise.all(characterPromises);

  return {
    id: episodeData.id,
    episode_name: episodeData.name,
    air_date: episodeData.air_date,
    characters,
  };
});

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
