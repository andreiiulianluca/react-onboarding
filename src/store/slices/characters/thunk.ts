import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { FetchedCharactersData } from "./slice";

type FetchCharactersParams = {
  pageNumber: number;
  searchTerm: string;
  filters: {
    gender: string | null;
    species: string | null;
    status: string | null;
  };
};

export const fetchCharacters = createAsyncThunk<
  FetchedCharactersData,
  FetchCharactersParams
>("characters/fetchCharacters", async ({ pageNumber, searchTerm, filters }) => {
  const { status, gender, species } = filters;

  const url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${searchTerm}&status=${
    status || ""
  }&gender=${gender || ""}&species=${species || ""}`;

  try {
    const response = await api.get<FetchedCharactersData>(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
});
