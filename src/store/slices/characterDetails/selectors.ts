import { RootState } from "../../index";

const selectCharacterDetails = (state: RootState) => state.characterDetail;
const selectCharacterDetailsData = (state: RootState) =>
  state.characterDetail.data;
const selectCharacterDetailsLoading = (state: RootState) =>
  state.characterDetail.isLoading;
const selectCharacterDetailsError = (state: RootState) =>
  state.characterDetail.error;

export {
  selectCharacterDetails,
  selectCharacterDetailsData,
  selectCharacterDetailsLoading,
  selectCharacterDetailsError,
};
