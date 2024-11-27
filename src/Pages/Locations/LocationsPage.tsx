import { useDispatch, useSelector } from "react-redux";
import FilterInput from "../../components/FilterInput/FilterInput";
import { useEffect, useState } from "react";
import { fetchCharactersPerLocation } from "../../store/slices/locations/thunk";
import { AppDispatch, RootState } from "../../store";
import styles from "./LocationsPage.module.scss";
import Card from "../../components/Card/Card";

const Location = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedLocation, setSelectedLocation] = useState<number>(1);
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.location
  );

  const locationName = data?.location_name || "Unknown";
  const dimension = data?.dimension || "Unknown";
  const type = data?.type || "Unknown";
  const charactersData = data?.characters;

  useEffect(() => {
    dispatch(fetchCharactersPerLocation(selectedLocation));
  }, [selectedLocation, dispatch]);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLocation(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h1 className={styles["text-center"]}>
          Location:{" "}
          <span className={styles["text-primary"]}>{locationName}</span>
        </h1>
        <h5 className={styles["text-center"]}>Dimension: {dimension}</h5>
        <h6 className={styles["text-center"]}>Type: {type}</h6>
      </div>
      <div className={styles.flex}>
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <h2>Choose location</h2>
          </div>
          <div className={styles.accordion}>
            <FilterInput
              name="Location"
              total={126}
              action={handleLocationChange}
              value={selectedLocation}
            />
          </div>
        </div>
        <div className={styles["card-container"]}>
          {charactersData
            ? charactersData.map((character) => (
                <Card
                  key={character.id}
                  id={character.id}
                  image={character.image}
                  name={character.name}
                  location={character.location}
                  status={character.status}
                />
              ))
            : !isLoading && <div className="m-auto">No results found</div>}
          {isLoading && <div className="text-center mt-5">Loading...</div>}
          {error && (
            <div className="text-center mt-5 text-red-500">Error: {error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
