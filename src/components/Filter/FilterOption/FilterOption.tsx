import styles from "./FilterOption.module.scss";
import clsx from "clsx";
import { Filters } from "../../../types/types";

interface FilterOptionProps {
  type: keyof Filters;
  title: string;
  isChecked: boolean;
  onFilterChange: (type: keyof Filters, value: string) => void;
}

const FilterOption = ({
  type,
  isChecked,
  title,
  onFilterChange,
}: FilterOptionProps) => {
  const handleFilterOptionClick = () => {
    onFilterChange(type, title);
  };

  return (
    <div>
      <button
        onClick={handleFilterOptionClick}
        className={clsx(styles.filterOption, { [styles.isChecked]: isChecked })}
      >
        {title}
      </button>
    </div>
  );
};

export default FilterOption;
