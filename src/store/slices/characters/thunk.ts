import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedCharactersData } from "./slice";

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
  FetchedCharactersData,
  FetchCharactersParams
>("characters/fetchCharacters", async ({ pageNumber, searchTerm, filters }) => {
  const { status, gender, species } = filters;

  const url = `character/?page=${pageNumber}&name=${searchTerm}&status=${
    status || ""
  }&gender=${gender || ""}&species=${species || ""}`;

  const response = await api.get<FetchedCharactersData>(url);
  return response.data;
});
