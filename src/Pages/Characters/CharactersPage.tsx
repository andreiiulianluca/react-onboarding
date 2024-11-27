import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";
import {
  incrementPageNumber,
  resetData,
} from "../../store/slices/characters/slice";
import { AppDispatch, RootState } from "../../store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import styles from "./CharactersPage.module.scss";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";

const Characters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, filters } = useSearchFilterContext();

  const { data, isLoading, error, pageNumber } = useSelector(
    (state: RootState) => state.characters
  );
  const charactersData = data?.results;

  const loadMore = () => {
    dispatch(incrementPageNumber());
    dispatch(
      fetchCharacters({ pageNumber: pageNumber + 1, searchTerm, filters })
    );
  };

  useEffect(() => {
    dispatch(resetData());
    dispatch(
      fetchCharacters({ pageNumber: pageNumber + 1, searchTerm, filters })
    );
  }, []);

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
