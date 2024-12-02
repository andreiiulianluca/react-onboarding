import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character, FetchedEpisodeData } from "./slice";

export const fetchCharactersPerEpisode = createAsyncThunk<
  FetchedEpisodeData,
  number
>("episode/fetchCharactersPerEpisode", async (episodeId) => {
  const { data: episodeData } = await api.get(`episode/${episodeId}`);

  const characterPromises = episodeData.characters.map((characterUrl: string) =>
    api
      .get<Character>(characterUrl.replace(api.defaults.baseURL || "", ""))
      .then((res) => res.data)
  );

  const characters: Character[] = await Promise.all(characterPromises);

  return {
    id: episodeData.id,
    episodeName: episodeData.name,
    airDate: episodeData.air_date,
    characters,
  };
});
