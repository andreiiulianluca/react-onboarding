import { useDispatch } from "react-redux";
import styles from "./Episodes.module.scss";
import { AppDispatch, useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import { resetData } from "../../store/slices/episodes/slice";
import { fetchCharactersPerEpisode } from "../../store/slices/episodes/thunk";
import FilterSelect from "../../components/Filter/FilterSelect/FilterSelect";
import Card from "../../components/Card/Card";

const EpisodesPage = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useAppSelector((state) => state.episode);
  const { characters, episodeName, airDate } = data || {};

  useEffect(() => {
    dispatch(resetData());
    dispatch(fetchCharactersPerEpisode(selectedEpisode));
  }, [selectedEpisode, dispatch]);

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(Number(event.target.value));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.textCenter}>
            Episode name:{" "}
            <span className={styles.textPrimary}>
              {episodeName || "Unknown"}
            </span>
          </h1>
          <h5 className={styles.textCenter}>
            Air Date: {airDate || "Unknown"}
          </h5>
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
                action={handleEpisodeChange}
                value={selectedEpisode}
              />
            </div>
          </div>
          <div className={styles.cardContainer}>
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
    </>
  );
};

export default EpisodesPage;
