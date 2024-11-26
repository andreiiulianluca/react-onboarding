import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  search: string;
  pageNumber: number;
}

const initialState: SearchState = {
  search: "",
  pageNumber: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.pageNumber = 1;
    },
  },
});

export const { setSearch, setPageNumber, resetFilters } = searchSlice.actions;

export default searchSlice.reducer;
