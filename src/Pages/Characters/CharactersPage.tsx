import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";
import {
  incrementPageNumber,
  resetData,
} from "../../store/slices/characters/slice";
import { AppDispatch, useAppSelector } from "../../store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import styles from "./CharactersPage.module.scss";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import useDebounce from "../../hooks/useDebounce";

const CharactersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, filters, setFilter } = useSearchFilterContext();
  const { data, pageNumber, isLoading, error } = useAppSelector(
    (state) => state.characters
  );

  const charactersData = data?.results;

  const debouncedFetchCharacters = useDebounce(
    (searchTerm: string, filters: any) => {
      dispatch(resetData());
      dispatch(
        fetchCharacters({
          pageNumber: 1,
          searchTerm,
          filters,
        })
      );
    },
    500
  );

  useEffect(() => {
    debouncedFetchCharacters(searchTerm, filters);
  }, [searchTerm, filters]);

  const loadMore = () => {
    dispatch(incrementPageNumber());
    dispatch(
      fetchCharacters({
        pageNumber: pageNumber + 1,
        searchTerm,
        filters,
      })
    );
  };

  const handleResetFilters = () => {
    setFilter({
      gender: "",
      species: "",
      status: "",
    });
    dispatch(resetData());
    dispatch(
      fetchCharacters({
        pageNumber: 1,
        searchTerm: searchTerm,
        filters: { gender: "", species: "", status: "" },
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
        searchTerm,
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
      <div className={styles.charactersGrid}>
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

export default CharactersPage;
