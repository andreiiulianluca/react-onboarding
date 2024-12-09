import { useDispatch } from "react-redux";
import FilterSelect from "../../components/Filter/FilterSelect/FilterSelect";
import { useEffect, useState } from "react";
import { fetchCharactersPerLocation } from "../../store/slices/locations/thunk";
import { AppDispatch, useAppSelector } from "../../store";
import { LOCATIONS_TOTAL } from "../../utils/constants";
import styles from "./LocationsPage.module.scss";
import CardContainer from "../../components/CardContainer/CardContainer";
import clsx from "clsx";
import { getBadgeVariant } from "../../utils/helpers";
import Card from "../../components/Card/Card";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";

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
      <PageHeader
        title={`Location: ${location?.name || "Unknown"}`}
        subtitle={`Dimension: ${location?.dimension || "Unknown"}`}
        description={`Type: ${type || "Unknown"}`}
      />
      <div className={styles.flex}>
        <Sidebar title="Choose location">
          <FilterSelect
            name="Location"
            total={LOCATIONS_TOTAL}
            onFilterChange={handleLocationChange}
            value={selectedLocation}
          />
        </Sidebar>
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
