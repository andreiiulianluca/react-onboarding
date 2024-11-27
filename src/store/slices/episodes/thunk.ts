import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character, FetchedEpisodeData } from "./slice";
import api from "../../../services/api";

export const fetchCharactersPerEpisode = createAsyncThunk<
  FetchedEpisodeData,
  number
>("episode/fetchCharactersPerEpisode", async (episodeId) => {
  try {
    const { data: episodeData } = await api.get(`episode/${episodeId}`);

    const characterPromises = episodeData.characters.map(
      (characterUrl: string) =>
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
  } catch (error) {
    throw new Error("Failed to fetch episode or character data");
  }
});
