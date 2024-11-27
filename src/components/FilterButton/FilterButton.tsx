import styles from "./FilterButton.module.scss";
import {
  Filters,
  useSearchFilterContext,
} from "../../contexts/SearchFilterContext";

interface FilterButtonProps {
  type: keyof Filters;
  title: string;
  onFilterChange: (type: string, value: string) => void;
}

const FilterButton = ({ type, title, onFilterChange }: FilterButtonProps) => {
  const { filters } = useSearchFilterContext();

  const buttonClass =
    filters[type] === title ? styles.selected : styles.notSelected;

  return (
    <div>
      <button
        onClick={() => onFilterChange(type, title)}
        className={`${styles.filterButton} ${buttonClass}`}
      >
        {title}
      </button>
    </div>
  );
};

export default FilterButton;
