import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";
import { incrementPageNumber } from "../../store/slices/characters/slice";
import { AppDispatch, useAppSelector } from "../../store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import styles from "./CharactersPage.module.scss";
import Filter from "../../components/Filter/Filter";
import useDebounce from "../../hooks/useDebounce";
import CardContainer from "../../components/CardContainer/CardContainer";

const CharactersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, filters, setFilter } = useSearchFilterContext();
  const { characters, pageNumber, isLoading, info, error } = useAppSelector(
    (state) => state.characters
  );
  const hasMore = Boolean(info?.next);

  const debouncedFetchCharacters = useDebounce(
    (searchTerm: string, filters: any) => {
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

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    dispatch(incrementPageNumber());
    dispatch(
      fetchCharacters({
        pageNumber: pageNumber + 1,
        searchTerm,
        filters,
      })
    );
  }, [hasMore, pageNumber, searchTerm, filters, dispatch]);

  const handleResetFilters = () => {
    setFilter({
      gender: "",
      species: "",
      status: "",
    });
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
    dispatch(
      fetchCharacters({
        pageNumber: 1,
        searchTerm,
        filters: updatedFilters,
      })
    );
  };

  useInfiniteScroll({ isLoading, onLoadMore: loadMore, hasMore });

  return (
    <div className={styles.container}>
      <Filter
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
      <div className={styles.charactersGrid}>
        <CardContainer
          characters={characters}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default CharactersPage;
