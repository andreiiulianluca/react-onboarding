import { RootState } from "../../index";

const selectEpisode = (state: RootState) => state.episode;
const selectEpisodeData = (state: RootState) => state.episode.data;
const selectEpisodeLoading = (state: RootState) => state.episode.isLoading;
const selectEpisodeError = (state: RootState) => state.episode.error;

export {
  selectEpisode,
  selectEpisodeData,
  selectEpisodeLoading,
  selectEpisodeError,
};
