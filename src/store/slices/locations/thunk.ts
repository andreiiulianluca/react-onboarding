import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedLocation } from "./slice";

export const fetchCharactersPerLocation = createAsyncThunk<
  FetchedLocation,
  number
>("location/fetchCharactersPerLocation", async (locationId) => {
  const { data: locationData } = await api.get(`location/${locationId}`);

  const residents = await api.get(`character/?location=${locationId}`);

  return {
    info: {
      count: residents.data.results.length,
      pages: 1,
    },
    characters: residents.data.results,
    location: { name: locationData.name, dimension: locationData.dimension },
    type: locationData.type,
  };
});
