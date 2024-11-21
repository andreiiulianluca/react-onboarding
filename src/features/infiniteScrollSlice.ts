import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FilterState } from "./filterSlice";
import { SearchState } from "./searchSlice";

type FetchedData = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: {
    id: number;
    name: string;
    image: string;
    status: string;
    location: { name: string; url: string };
  }[];
};

type InfiniteScrollState = {
  data: FetchedData | null;
  isLoading: boolean;
  error: string | null;
  pageNumber: number;
  search: string;
};

const initialState: InfiniteScrollState = {
  data: null,
  isLoading: false,
  error: null,
  pageNumber: 1,
  search: "",
};

export const fetchCharacters = createAsyncThunk<
  FetchedData,
  void,
  {
    state: {
      infiniteScroll: InfiniteScrollState;
      filter: FilterState;
      search: SearchState;
    };
  }
>("infiniteScroll/fetchCharacters", async (_, { getState }) => {
  const { pageNumber } = getState().infiniteScroll;
  const { search } = getState().search;
  const { status, gender, species } = getState().filter;

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
});

const infiniteScrollSlice = createSlice({
  name: "infiniteScroll",
  initialState,
  reducers: {
    resetData(state) {
      state.data = null;
      state.pageNumber = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = {
          ...action.payload,
          results: state.data
            ? [...state.data.results, ...action.payload.results]
            : action.payload.results,
        };
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { resetData } = infiniteScrollSlice.actions;
export default infiniteScrollSlice.reducer;
