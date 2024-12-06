import { useState } from "react";
import FilterButton from "../FilterButton/FilterButton";
import { filterOptions } from "../../../utils/constants";
import styles from "./FilterAccordion.module.scss";
import clsx from "clsx";
import { useSearchFilterContext } from "../../../contexts/SearchFilterContext";

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
            {(filterOptions[type] || []).map((title, index) => {
              const buttonVariant =
                filters[type] === title ? "selected" : "outlined";

              return (
                <FilterButton
                  variant={buttonVariant}
                  key={index}
                  type={type}
                  onFilterChange={onFilterChange}
                  title={title}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;
