import styles from "./FilterButton.module.scss";
import {
  Filters,
  useSearchFilterContext,
} from "../../../contexts/SearchFilterContext";
import clsx from "clsx";

interface FilterButtonProps {
  type: keyof Filters;
  title: string;
  onFilterChange: (type: string, value: string) => void;
}

const FilterButton = ({ type, title, onFilterChange }: FilterButtonProps) => {
  const { filters } = useSearchFilterContext();

  const handleFilterButtonClick = () => {
    onFilterChange(type, title);
  };

  return (
    <div>
      <button
        onClick={handleFilterButtonClick}
        className={clsx(styles.filterButton, {
          [styles.selected]: filters[type] === title,
          [styles.notSelected]: filters[type] !== title,
        })}
      >
        {title}
      </button>
    </div>
  );
};

export default FilterButton;
