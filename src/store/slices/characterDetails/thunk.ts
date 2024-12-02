import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedCharacterDetailsData } from "./slice";

export const fetchCharacterDetails = createAsyncThunk<
  FetchedCharacterDetailsData,
  string | undefined
>("characters/fetchCharactersDetails", async (characterId) => {
  const response = await api.get<FetchedCharacterDetailsData>(
    `character/${characterId}`
  );
  return response.data;
});
