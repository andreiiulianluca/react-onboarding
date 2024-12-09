import { useState } from "react";
import { filterOptions } from "../../../utils/constants";
import styles from "./FilterAccordion.module.scss";
import clsx from "clsx";
import { useSearchFilterContext } from "../../../contexts/SearchFilterContext";
import FilterOption from "../FilterOption/FilterOption";
import { Filters } from "../../../types/types";

interface FilterAccordionProps {
  title: string;
  type: keyof Filters;
  onFilterChange: (type: keyof Filters, value: string) => void;
}

const FilterAccordion = ({
  title,
  type,
  onFilterChange,
}: FilterAccordionProps) => {
  const { filters } = useSearchFilterContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionItem}>
      <h2>
        <button
          className={styles.accordionHeader}
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls="collapseOne"
        >
          {title}
        </button>
      </h2>
      <div
        id="collapseOne"
        className={clsx(styles.accordionCollapse, { [styles.open]: isOpen })}
        aria-labelledby="headingOne"
      >
        <div className={styles.accordionBody}>
          <div className={styles.filterOptions}>
            {(filterOptions[type] || []).map((title, index) => (
              <FilterOption
                key={index}
                type={type}
                isChecked={filters[type] === title}
                title={title}
                onFilterChange={onFilterChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;
