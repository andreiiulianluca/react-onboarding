import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FetchedCharacterDetailsData = {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  species: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
};

type CharacterDetailsState = {
  data: FetchedCharacterDetailsData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: CharacterDetailsState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchCharacterDetails = createAsyncThunk<
  FetchedCharacterDetailsData,
  string | undefined
>("characters/fetchCharactersDetails", async (characterId) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${characterId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch character details");
  }

  return response.json();
});

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {
    resetData(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { resetData } = characterDetailsSlice.actions;
export default characterDetailsSlice.reducer;
