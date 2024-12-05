import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacterDetails } from "./thunk";

export type CharacterDetails = {
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
  characterDetails?: CharacterDetails;
  isLoading: boolean;
  error?: string;
};

const initialState: CharacterDetailsState = {
  characterDetails: undefined,
  isLoading: false,
  error: "",
};

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.characterDetails = action.payload;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default characterDetailsSlice.reducer;
