import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/characters/slice";
import locationReducer from "./slices/locations/slice";
import episodeReducer from "./slices/episodes/slice";
import characterDetailsReducer from "./slices/characterDetails/slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    characterDetail: characterDetailsReducer,
    location: locationReducer,
    episode: episodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
