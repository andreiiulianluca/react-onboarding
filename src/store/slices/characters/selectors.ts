import { RootState } from "../../index";

const selectCharacters = (state: RootState) => state.characters;
const selectCharactersData = (state: RootState) => state.characters.data;
const selectCharactersPageNumber = (state: RootState) =>
  state.characters.pageNumber;
const selectCharactersLoading = (state: RootState) =>
  state.characters.isLoading;
const selectCharactersError = (state: RootState) => state.characters.error;

export {
  selectCharacters,
  selectCharactersData,
  selectCharactersPageNumber,
  selectCharactersLoading,
  selectCharactersError,
};
