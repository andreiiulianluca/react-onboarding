import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedCharacters } from "./slice";

type FetchCharactersParams = {
  pageNumber: number;
  searchTerm: string;
  filters: {
    gender?: string;
    species?: string;
    status?: string;
  };
};

export const fetchCharacters = createAsyncThunk<
  FetchedCharacters,
  FetchCharactersParams
>("characters/fetchCharacters", async ({ pageNumber, searchTerm, filters }) => {
  const { status, gender, species } = filters;

  const params = {
    page: pageNumber,
    name: searchTerm,
    status,
    gender,
    species,
  };

  const response = await api.get<FetchedCharacters>("character/", { params });
  return response.data;
});
