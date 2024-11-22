import { useDispatch, useSelector } from "react-redux";
import CardContainer, {
  ScrollTypes,
} from "../componentes/CardContainer/CardContainer";
import { AppDispatch, RootState } from "../store";
import FilterInput from "../componentes/Filter/category/FilterInput";
import { useEffect, useState } from "react";
import { fetchCharactersPerLocation } from "../features/locationSlice";

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.location
  );

  const locationName = data?.location_name || "Unknown";
  const dimension = data?.dimension || "Unknown";
  const type = data?.type || "Unknown";

  useEffect(() => {
    dispatch(fetchCharactersPerLocation(selectedLocation));
  }, [selectedLocation, dispatch]);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLocation(Number(event.target.value));
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="text-center text-2xl mt-3 mb-3">
          Location: <span className="text-primary">{locationName}</span>
        </h1>
        <h5 className="text-center">Dimension: {dimension}</h5>
        <h6 className="text-center">Type: {type}</h6>
      </div>
      <div className="flex container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full h-fit sm:w-80 ml-6 mr-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">Choose location</h2>
          </div>
          <div className="accordion space-y-4">
            <FilterInput
              name="Location"
              total={126}
              action={handleLocationChange}
              value={selectedLocation}
            />
          </div>
        </div>
        <CardContainer
          type={ScrollTypes.NORMAL}
          characters={data?.characters || []}
          isLoading={isLoading}
          error={error}
          action={fetchCharactersPerLocation(selectedLocation)}
        />
      </div>
    </div>
  );
};

export default Location;
