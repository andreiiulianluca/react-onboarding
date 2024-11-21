import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import infiniteScrollReducer from "./features/infiniteScrollSlice";
import filterReducer from "./features/filterSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    infiniteScroll: infiniteScrollReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
