import { useDispatch } from "react-redux";
import FilterSelect from "../../components/Filter/FilterSelect/FilterSelect";
import { useEffect, useState } from "react";
import { fetchCharactersPerLocation } from "../../store/slices/locations/thunk";
import { AppDispatch, useAppSelector } from "../../store";
import styles from "./LocationsPage.module.scss";
import Card from "../../components/Card/Card";

const LocationsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedLocation, setSelectedLocation] = useState<number>(1);
  const { data, isLoading, error } = useAppSelector((state) => state.location);
  const { location, dimension, type, characters } = data || {};
  const locationName = location?.name || "Unknown";

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
          <span className={styles["text-primary"]}>
            {locationName || "Unknown"}
          </span>
        </h1>
        <h5 className={styles["text-center"]}>
          Dimension: {dimension || "Unknown"}
        </h5>
        <h6 className={styles["text-center"]}>Type: {type || "Unknown"}</h6>
      </div>
      <div className={styles.flex}>
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <h2>Choose location</h2>
          </div>
          <div className={styles.accordion}>
            <FilterSelect
              name="Location"
              total={126}
              action={handleLocationChange}
              value={selectedLocation}
            />
          </div>
        </div>
        <div className={styles["card-container"]}>
          {characters
            ? characters.map((character) => (
                <Card
                  key={character.id}
                  id={character.id}
                  image={character.image}
                  name={character.name}
                  location={character.location}
                  status={character.status}
                />
              ))
            : !isLoading && (
                <div className={`${styles.message}`}>No results found</div>
              )}
          {isLoading && (
            <div className={`${styles.message} ${styles.loading}`}>
              Loading...
            </div>
          )}
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              Error: {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
