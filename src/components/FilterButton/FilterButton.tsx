import FilterButtonProps from "./FilterButtonProps";
import styles from "./FilterButton.module.scss";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";

const FilterButton = ({ type, title, action }: FilterButtonProps) => {
  const { filters } = useSearchFilterContext();

  const buttonClass =
    filters[type] === title ? styles.selected : styles.notSelected;

  return (
    <div>
      <button
        onClick={() => action(title)}
        className={`${styles.filterButton} ${buttonClass}`}
      >
        {title}
      </button>
    </div>
  );
};

export default FilterButton;
