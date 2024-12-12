import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedLocation } from "./slice";

export const fetchCharactersPerLocation = createAsyncThunk<
  FetchedLocation,
  number
>("location/fetchCharactersPerLocation", async (locationId) => {
  const { data: locationData } = await api.get(`location/${locationId}`);

  const residents = await Promise.all(
    locationData.residents.map((characterUrl: string) => api.get(characterUrl))
  );
  const residentsData = residents.map((resident) => resident.data);

  return {
    info: {
      count: residentsData.length,
      pages: 1,
    },
    characters: residentsData,
    location: { name: locationData.name, dimension: locationData.dimension },
    type: locationData.type,
  };
});
