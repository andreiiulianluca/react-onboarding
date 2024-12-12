import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCharacters,
  fetchMoreCharacters,
} from "../../store/slices/characters/thunk";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";
import { AppDispatch, useAppSelector } from "../../store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import styles from "./CharactersPage.module.scss";
import Filter from "../../components/Filter/Filter";
import useDebounce from "../../hooks/useDebounce";
import CardContainer from "../../components/CardContainer/CardContainer";
import Card from "../../components/Card/Card";
import { getBadgeVariant } from "../../utils/helpers";
import clsx from "clsx";

const CharactersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, filters, setFilter } = useSearchFilterContext();
  const { characters, pageNumber, isLoading, error } = useAppSelector(
    (state) => state.characters
  );

  const debouncedFetchCharacters = useDebounce(
    (searchTerm: string, filters: any) => {
      dispatch(
        fetchCharacters({
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
    dispatch(
      fetchMoreCharacters({
        searchTerm,
        filters,
      })
    );
  }, [pageNumber, searchTerm, filters, dispatch]);

  const handleResetFilters = () => {
    setFilter({
      gender: "",
      species: "",
      status: "",
    });
    dispatch(
      fetchCharacters({
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
        searchTerm,
        filters: updatedFilters,
      })
    );
  };

  useInfiniteScroll({ isLoading, onLoadMore: loadMore });

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Filter
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>
      <div className={styles.cardContainer}>
        <CardContainer>
          {characters
            ? characters.map((character) => (
                <Card
                  key={character.id}
                  id={character.id}
                  image={character.image}
                  title={character.name}
                  badgeProps={{
                    text: character.status,
                    variant: getBadgeVariant(character.status),
                  }}
                  description={character.location.name}
                />
              ))
            : !isLoading && (
                <div className={styles.message}>No results found</div>
              )}
          {isLoading && (
            <div className={clsx(styles.message, styles.loading)}>
              Loading...
            </div>
          )}
          {error && (
            <div className={clsx(styles.message, styles.error)}>{error}</div>
          )}
        </CardContainer>
      </div>
    </div>
  );
};

export default CharactersPage;
