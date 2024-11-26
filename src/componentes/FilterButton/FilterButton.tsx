import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../../store/slices/search/slice";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { resetData } from "../../store/slices/characters/slice";
import FilterButtonProps from "./FilterButtonProps";
import { AppDispatch, RootState } from "../../store";
import styles from "./FilterButton.module.scss";

const FilterButton = ({ type, input, action }: FilterButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filter);
  const { gender, status, species } = filters;

  const handleClick = () => {
    dispatch(action(input));
    dispatch(setPageNumber(1));
    dispatch(resetData());
    dispatch(fetchCharacters());
  };

  const isSelected = (type: string) => {
    switch (type) {
      case "gender":
        return gender === input;
      case "status":
        return status === input;
      case "species":
        return species === input;
      default:
        return false;
    }
  };

  const buttonClass = isSelected(type) ? styles.selected : styles.notSelected;

  return (
    <div className={styles.filterButton}>
      <button
        onClick={handleClick}
        className={`${styles.filterButton} ${buttonClass}`}
      >
        {input}
      </button>
    </div>
  );
};

export default FilterButton;
