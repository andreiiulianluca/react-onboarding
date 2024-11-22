import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import charactersReducer from "./features/charactersSlice";
import filterReducer from "./features/filterSlice";
import locationReducer from "./features/locationSlice";
import episodeReducer from "./features/episodeSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    characters: charactersReducer,
    filter: filterReducer,
    location: locationReducer,
    episode: episodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
