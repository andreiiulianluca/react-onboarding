import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchedCharacterDetailsData } from "./slice";

export const fetchCharacterDetails = createAsyncThunk<
  FetchedCharacterDetailsData,
  string | undefined
>("characters/fetchCharactersDetails", async (characterId) => {
  try {
    const response = await axios.get<FetchedCharacterDetailsData>(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch character details");
  }
});
