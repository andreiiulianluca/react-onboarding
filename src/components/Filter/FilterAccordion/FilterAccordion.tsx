import { useState } from "react";
import FilterButton from "../FilterButton/FilterButton";
import { filterOptions } from "../../../utils/constants";
import styles from "./FilterAccordion.module.scss";
import clsx from "clsx";

export type FilterAccordionType = keyof typeof filterOptions;

interface FilterAccordionProps {
  title: string;
  type: FilterAccordionType;
  onFilterChange: (type: string, value: string) => void;
}

const FilterAccordion = ({
  title,
  type,
  onFilterChange,
}: FilterAccordionProps) => {
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
          aria-expanded={isOpen ? "true" : "false"}
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
            {(filterOptions[type] || []).map((item, index) => (
              <FilterButton
                key={index}
                type={type}
                onFilterChange={onFilterChange}
                title={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;
