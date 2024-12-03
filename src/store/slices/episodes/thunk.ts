import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedEpisodeData } from "./slice";

export const fetchCharactersPerEpisode = createAsyncThunk<
  FetchedEpisodeData,
  number
>("episode/fetchCharactersPerEpisode", async (episodeId) => {
  const { data: episodeData } = await api.get(`episode/${episodeId}`);

  const characters = await api.get(`character/?episode=${episodeId}`);

  return {
    name: episodeData.name,
    airDate: episodeData.air_date,
    characters: characters.data.results,
  };
});
