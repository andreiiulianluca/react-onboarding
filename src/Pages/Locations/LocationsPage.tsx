import { useDispatch } from "react-redux";
import FilterSelect from "../../components/Filter/FilterSelect/FilterSelect";
import { useEffect, useState } from "react";
import { fetchCharactersPerLocation } from "../../store/slices/locations/thunk";
import { AppDispatch, useAppSelector } from "../../store";
import styles from "./LocationsPage.module.scss";
import CardContainer from "../../components/CardContainer/CardContainer";
import clsx from "clsx";
import { getBadgeVariant } from "../../utils/helpers";
import Card from "../../components/Card/Card";

const LocationsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedLocation, setSelectedLocation] = useState<number>(1);
  const { characters, location, type, isLoading, error } = useAppSelector(
    (state) => state.location
  );

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
            {location?.name || "Unknown"}
          </span>
        </h1>
        <h5 className={styles["text-center"]}>
          Dimension: {location?.dimension || "Unknown"}
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
              onFilterChange={handleLocationChange}
              value={selectedLocation}
            />
          </div>
        </div>
        <CardContainer>
          {characters
            ? characters.map((character) => (
                <Card
                  key={character.id}
                  id={character.id}
                  image={character.image}
                  title={character.name}
                  badgeProps={{
                    text: character.status,
                    variant: getBadgeVariant(character.status),
                  }}
                  description={character.location.name}
                />
              ))
            : !isLoading && (
                <div className={styles.message}>No results found</div>
              )}
          {isLoading && (
            <div className={clsx(styles.message, styles.loading)}>
              Loading...
            </div>
          )}
          {error && (
            <div className={clsx(styles.message, styles.error)}>
              Error: {error}
            </div>
          )}
        </CardContainer>
      </div>
    </div>
  );
};

export default LocationsPage;
