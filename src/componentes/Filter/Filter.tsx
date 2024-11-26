import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { resetFilter } from "../../store/slices/filter/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { resetData } from "../../store/slices/characters/slice";
import styles from "./Filter.module.scss";
import { filterCategories } from "../../utils/constants";

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(resetFilter());
    dispatch(resetData());
    dispatch(fetchCharacters());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button onClick={handleClick} className={styles.clearButton}>
          Clear
        </button>
      </div>
      <div className={styles.accordion}>
        <div className={styles.accordion}>
          {filterCategories.map((category, index) => (
            <FilterDropdown
              key={index}
              title={category.title}
              type={category.type}
              action={category.action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
