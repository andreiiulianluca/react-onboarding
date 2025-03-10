import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CharacterDetails } from "./slice";

export const fetchCharacterDetails = createAsyncThunk<
  CharacterDetails,
  string | undefined
>("characters/fetchCharactersDetails", async (characterId) => {
  const response = await api.get<CharacterDetails>(`character/${characterId}`);
  return response.data;
});
