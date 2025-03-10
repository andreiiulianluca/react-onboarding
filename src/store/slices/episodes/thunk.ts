import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedEpisode } from "./slice";

export const fetchCharactersPerEpisode = createAsyncThunk<
  FetchedEpisode,
  number
>("episode/fetchCharactersPerEpisode", async (episodeId) => {
  const { data: episodeData } = await api.get(`episode/${episodeId}`);

  const characters = await Promise.all(
    episodeData.characters.map((characterUrl: string) => api.get(characterUrl))
  );

  const charactersData = characters.map((character) => character.data);

  return {
    name: episodeData.name,
    airDate: episodeData.air_date,
    characters: charactersData,
  };
});
