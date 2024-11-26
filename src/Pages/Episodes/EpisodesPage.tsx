import { useDispatch, useSelector } from "react-redux";
import styles from "./Episodes.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { resetData } from "../../store/slices/episodes/slice";
import { fetchCharactersPerEpisode } from "../../store/slices/episodes/thunk";
import FilterInput from "../../componentes/FilterInput/FilterInput";
import Card from "../../componentes/Card/Card";

const Episodes = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.episode
  );

  const characterData = data?.characters;
  const episodeName = data?.episode_name || "Unknown";
  const airDate = data?.air_date || "Unknown";

  useEffect(() => {
    dispatch(resetData());
    dispatch(fetchCharactersPerEpisode(selectedEpisode));
  }, [selectedEpisode, dispatch]);

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h1 className={styles["text-center"]}>
          Episode name:{" "}
          <span className={styles["text-primary"]}>{episodeName}</span>
        </h1>
        <h5 className={styles["text-center"]}>Air Date: {airDate}</h5>
      </div>
      <div className={styles.flex}>
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <h2>Pick an episode</h2>
          </div>
          <div className={styles.accordion}>
            <FilterInput
              name="Episode"
              total={51}
              action={handleEpisodeChange}
              value={selectedEpisode}
            />
          </div>
        </div>
        <div className={styles["card-container"]}>
          {characterData
            ? characterData.map((character) => (
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

export default Episodes;
