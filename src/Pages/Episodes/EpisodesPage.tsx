import { useDispatch } from "react-redux";
import styles from "./Episodes.module.scss";
import { AppDispatch, useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import { fetchCharactersPerEpisode } from "../../store/slices/episodes/thunk";
import FilterSelect from "../../components/Filter/FilterSelect/FilterSelect";
import CardContainer from "../../components/CardContainer/CardContainer";

const EpisodesPage = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { characters, name, airDate, isLoading, error } = useAppSelector(
    (state) => state.episode
  );

  useEffect(() => {
    dispatch(fetchCharactersPerEpisode(selectedEpisode));
  }, [selectedEpisode, dispatch]);

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h1 className={styles.textCenter}>
          Episode name:{" "}
          <span className={styles.textPrimary}>{name || "Unknown"}</span>
        </h1>
        <h5 className={styles.textCenter}>Air Date: {airDate || "Unknown"}</h5>
      </div>
      <div className={styles.flex}>
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <h2>Pick an episode</h2>
          </div>
          <div className={styles.accordion}>
            <FilterSelect
              name="Episode"
              total={51}
              onFilterChange={handleEpisodeChange}
              value={selectedEpisode}
            />
          </div>
        </div>
        <div className={styles.cardContainer}>
          <CardContainer
            characters={characters}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default EpisodesPage;
