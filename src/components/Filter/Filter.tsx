import { filterCategories } from "../../utils/constants";
import styles from "./Filter.module.scss";
import FilterAccordion from "./FilterAccordion/FilterAccordion";
import Button from "../Button/Button";

type FilterProps = {
  onFilterChange: (type: string, value: string) => void;
  onResetFilters: () => void;
};

const Filter = ({ onFilterChange, onResetFilters }: FilterProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <Button className={styles.clearButton} onClick={onResetFilters}>
          Clear
        </Button>
      </div>
      <div className={styles.accordion}>
        {filterCategories.map((category) => (
          <FilterAccordion
            key={category.type}
            title={category.title}
            type={category.type}
            onFilterChange={onFilterChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
