import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/search/slice";
import charactersReducer from "./slices/characters/slice";
import filterReducer from "./slices/filter/slice";
import locationReducer from "./slices/locations/slice";
import episodeReducer from "./slices/episodes/slice";
import characterDetailsReducer from "./slices/characterDetails/slice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    characters: charactersReducer,
    characterDetail: characterDetailsReducer,
    filter: filterReducer,
    location: locationReducer,
    episode: episodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
