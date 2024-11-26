import { useDispatch, useSelector } from "react-redux";
import CardContainer from "../../componentes/CardContainer/CardContainer";
import FilterInput from "../../componentes/Filter/category/FilterInput";
import { useEffect, useState } from "react";
import { fetchCharactersPerLocation } from "../../store/slices/locations/thunk";
import { AppDispatch, RootState } from "../../store";
import styles from "./LocationPage.module.scss";

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
          <CardContainer
            type="normal"
            characters={data?.characters || []}
            isLoading={isLoading}
            error={error}
            action={fetchCharactersPerLocation(selectedLocation)}
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
