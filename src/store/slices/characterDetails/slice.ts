import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacterDetails } from "./thunk";

export type FetchedCharacterDetailsData = {
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
  error?: string;
};

const initialState: CharacterDetailsState = {
  data: null,
  isLoading: false,
  error: "",
};

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {
    resetData(state) {
      state.data = null;
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
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
