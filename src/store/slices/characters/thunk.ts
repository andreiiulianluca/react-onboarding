import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { CharactersState, FetchedCharactersData } from "./slice";
import { FilterState } from "../filter/slice";
import { SearchState } from "../search/slice";

export const fetchCharacters = createAsyncThunk<
  FetchedCharactersData,
  void,
  {
    state: {
      characters: CharactersState;
      filter: FilterState;
      search: SearchState;
    };
  }
>("characters/fetchCharacters", async (_, { getState }) => {
  const { pageNumber } = getState().characters;
  const { search } = getState().search;
  const { status, gender, species } = getState().filter;

  try {
    const response = await api.get<FetchedCharactersData>("character/", {
      params: {
        page: pageNumber,
        name: search,
        status,
        gender,
        species,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
});
