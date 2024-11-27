import api from "../../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchedLocationData } from "./slice";

export const fetchCharactersPerLocation = createAsyncThunk<
  FetchedLocationData,
  number
>("location/fetchCharactersPerLocation", async (locationId) => {
  try {
    const { data: locationData } = await api.get(`location/${locationId}`);

    const characterPromises = locationData.residents.map(
      (residentUrl: string) =>
        api
          .get(residentUrl.replace(api.defaults.baseURL || "", ""))
          .then((res) => res.data)
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
  } catch (error) {
    throw new Error("Failed to fetch location or resident data");
  }
});