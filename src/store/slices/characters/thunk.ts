import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CharactersState, FetchedCharacters } from "./slice";

type FetchCharactersParams = {
  searchTerm: string;
  pageNumber?: number;
  filters: {
    gender?: string;
    species?: string;
    status?: string;
  };
};

const fetchCharacters = createAsyncThunk<
  FetchedCharacters,
  FetchCharactersParams
>("characters/fetchCharacters", async ({ searchTerm, filters }) => {
  const { status, gender, species } = filters;

  const params = {
    page: 1,
    name: searchTerm,
    status,
    gender,
    species,
  };

  const response = await api.get<FetchedCharacters>("character/", { params });
  return response.data;
});

const fetchMoreCharacters = createAsyncThunk<
  FetchedCharacters,
  FetchCharactersParams,
  { state: { characters: CharactersState } }
>(
  "characters/fetchMoreCharacters",
  async ({ searchTerm, filters }, { getState, rejectWithValue }) => {
    const { pageNumber, info } = getState().characters;

    if (!info?.next) {
      return rejectWithValue("No more characters to load.");
    }

    const params = {
      page: pageNumber + 1,
      name: searchTerm,
      ...filters,
    };

    const response = await api.get<FetchedCharacters>("character/", {
      params,
    });
    return response.data;
  }
);

export { fetchCharacters, fetchMoreCharacters };
