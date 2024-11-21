import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  status: string;
  gender: string;
  species: string;
}

const initialState: FilterState = {
  status: "",
  gender: "",
  species: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string>) => {
      state.species = action.payload;
    },
    resetFilter: (state) => {
      state.status = "";
      state.gender = "";
      state.species = "";
    },
  },
});

export const { setStatus, setGender, setSpecies, resetFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
