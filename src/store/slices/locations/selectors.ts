import { RootState } from "../../index";

const selectLocation = (state: RootState) => state.location;
const selectLocationData = (state: RootState) => state.location.data;
const selectLocationLoading = (state: RootState) => state.location.isLoading;
const selectLocationError = (state: RootState) => state.location.error;

export {
  selectLocation,
  selectLocationData,
  selectLocationLoading,
  selectLocationError,
};
