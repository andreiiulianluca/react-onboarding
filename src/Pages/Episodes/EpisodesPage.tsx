import { useDispatch, useSelector } from "react-redux";
import styles from "./Episodes.module.scss";
import { AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { resetData } from "../../store/slices/episodes/slice";
import { fetchCharactersPerEpisode } from "../../store/slices/episodes/thunk";
import FilterInput from "../../components/FilterInput/FilterInput";
import Card from "../../components/Card/Card";
import {
  selectEpisodeData,
  selectEpisodeError,
  selectEpisodeLoading,
} from "../../store/slices/episodes/selectors";

const Episodes = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectEpisodeData);
  const isLoading = useSelector(selectEpisodeLoading);
  const error = useSelector(selectEpisodeError);

  const { characters, episodeName, airDate } = data || {};

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
          <span className={styles["text-primary"]}>
            {episodeName || "Unknown"}
          </span>
        </h1>
        <h5 className={styles["text-center"]}>
          Air Date: {airDate || "Unknown"}
        </h5>
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
