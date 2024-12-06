import styles from "./FilterButton.module.scss";
import { Filters } from "../../../contexts/SearchFilterContext";
import clsx from "clsx";

interface FilterButtonProps {
  variant: "outlined" | "selected";
  type: keyof Filters;
  title: string;
  onFilterChange: (type: string, value: string) => void;
}

const FilterButton = ({
  variant,
  type,
  title,
  onFilterChange,
}: FilterButtonProps) => {
  const handleFilterButtonClick = () => {
    onFilterChange(type, title);
  };

  return (
    <div>
      <button
        onClick={handleFilterButtonClick}
        className={clsx(styles.filterButton, styles[variant])}
      >
        {title}
      </button>
    </div>
  );
};

export default FilterButton;
