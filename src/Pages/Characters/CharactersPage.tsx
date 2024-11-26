import { useEffect } from "react";
import Filter from "../../componentes/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import {
  incrementPageNumber,
  resetData,
} from "../../store/slices/characters/slice";
import { AppDispatch, RootState } from "../../store";
import Card from "../../componentes/Card/Card";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import styles from "./CharactersPage.module.scss";

const Characters = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.characters
  );
  const charactersData = data?.results;

  const loadMore = () => {
    dispatch(incrementPageNumber());
    dispatch(fetchCharacters());
  };

  useEffect(() => {
    dispatch(resetData());
    dispatch(fetchCharacters());
  }, [dispatch]);

  useInfiniteScroll({ isLoading, onLoadMore: loadMore });

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles["characters-grid"]}>
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
  );
};

export default Characters;
