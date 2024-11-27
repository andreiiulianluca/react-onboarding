import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";
import {
  incrementPageNumber,
  resetData,
} from "../../store/slices/characters/slice";
import { AppDispatch } from "../../store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import styles from "./CharactersPage.module.scss";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import useDebounce from "../../hooks/useDebounce";
import {
  selectCharactersData,
  selectCharactersError,
  selectCharactersLoading,
  selectCharactersPageNumber,
} from "../../store/slices/characters/selectors";

const Characters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, filters, setFilter } = useSearchFilterContext();
  const data = useSelector(selectCharactersData);
  const pageNumber = useSelector(selectCharactersPageNumber);
  const isLoading = useSelector(selectCharactersLoading);
  const error = useSelector(selectCharactersError);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const charactersData = data?.results;

  useEffect(() => {
    dispatch(resetData());
    dispatch(
      fetchCharacters({
        pageNumber: 1,
        searchTerm: debouncedSearchTerm,
        filters,
      })
    );
  }, [debouncedSearchTerm, filters]);

  const loadMore = () => {
    dispatch(incrementPageNumber());
    dispatch(
      fetchCharacters({
        pageNumber: pageNumber + 1,
        searchTerm: debouncedSearchTerm,
        filters,
      })
    );
  };

  const handleResetFilters = () => {
    setFilter({
      gender: null,
      species: null,
      status: null,
    });
    dispatch(resetData());
    dispatch(
      fetchCharacters({
        pageNumber: 1,
        searchTerm: searchTerm,
        filters: { gender: null, species: null, status: null },
      })
    );
  };

  const handleFilterChange = (type: string, value: string) => {
    const updatedFilters = { ...filters, [type]: value };
    setFilter(updatedFilters);
    dispatch(resetData());
    dispatch(
      fetchCharacters({
        pageNumber: 1,
        searchTerm: debouncedSearchTerm,
        filters: updatedFilters,
      })
    );
  };

  useInfiniteScroll({ isLoading, onLoadMore: loadMore });

  return (
    <div className={styles.container}>
      <Filter
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
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
