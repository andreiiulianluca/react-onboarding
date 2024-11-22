import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Character = {
  id: number;
  name: string;
  location: { name: string; url: string };
  image: string;
  status: string;
};

export type FetchedLocationData = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  characters: Character[];
  location_name: string;
  dimension: string;
  type: string;
};

type LocationState = {
  data: FetchedLocationData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: LocationState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchCharactersPerLocation = createAsyncThunk<
  FetchedLocationData,
  number
>("location/fetchCharactersPerLocation", async (locationId) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/location/${locationId}`
  );

  if (!response.ok) throw new Error("Failed to fetch location data");

  const locationData = await response.json();

  const characterPromises = locationData.residents.map((residentUrl: string) =>
    fetch(residentUrl).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch character data");
      return res.json();
    })
  );

  const residents = await Promise.all(characterPromises);

  return {
    info: {
      count: residents.length,
      pages: 1,
      next: null,
      prev: null,
    },
    characters: residents,
    location_name: locationData.name,
    dimension: locationData.dimension,
    type: locationData.type,
  };
});

const locationsSlice = createSlice({
  name: "locationsSlice",
  initialState,
  reducers: {
    resetData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersPerLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharactersPerLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchCharactersPerLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export const { resetData } = locationsSlice.actions;
export default locationsSlice.reducer;
