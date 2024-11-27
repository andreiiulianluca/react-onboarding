import React from "react";
import { useDispatch } from "react-redux";
import { resetData } from "../../store/slices/characters/slice";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { AppDispatch } from "../../store";
import { filterCategories } from "../../utils/constants";
import styles from "./Filter.module.scss";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";
import FilterDropdown from "../FilterDropdown/FilterDropdown";

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, filters, setFilter } = useSearchFilterContext();

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
        searchTerm: "",
        filters: {
          gender: null,
          species: null,
          status: null,
        },
      })
    );
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilter({
      ...filters,
      [type]: value,
    });
    dispatch(resetData());
    dispatch(
      fetchCharacters({
        pageNumber: 1,
        searchTerm: searchTerm,
        filters: { ...filters, [type]: value },
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button className={styles.clearButton} onClick={handleResetFilters}>
          Clear
        </button>
      </div>
      <div className={styles.accordion}>
        {filterCategories.map((category) => (
          <FilterDropdown
            key={category.type}
            title={category.title}
            type={category.type}
            action={(value: string) => handleFilterChange(category.type, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
