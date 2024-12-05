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

  const url = `character/?page=${pageNumber}&name=${searchTerm}&status=${
    status || ""
  }&gender=${gender || ""}&species=${species || ""}`;

  const response = await api.get<FetchedCharacters>(url);
  return response.data;
});
