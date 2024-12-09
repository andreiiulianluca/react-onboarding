import { useState } from "react";
import { filterOptions } from "../../../utils/constants";
import styles from "./FilterAccordion.module.scss";
import clsx from "clsx";
import { useSearchFilterContext } from "../../../contexts/SearchFilterContext";
import { Filters } from "../../../types/types";
import Button from "../../Button/Button";
import Checkbox from "../../Checkbox/Checkbox";

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

  const handleFilterOptionChange = (type: keyof Filters, title: string) => {
    onFilterChange(type, title);
  };

  return (
    <div className={styles.accordionItem}>
      <h2>
        <Button className={styles.accordionHeader} onClick={toggleAccordion}>
          {title}
        </Button>
      </h2>
      <div
        id="collapseOne"
        className={clsx(styles.accordionCollapse, { [styles.open]: isOpen })}
        aria-labelledby="headingOne"
      >
        <div className={styles.accordionBody}>
          <div className={styles.filterOptions}>
            {(filterOptions[type] || []).map((title) => (
              <Checkbox
                key={title}
                id={`${type}-${title}`}
                label={title}
                isChecked={filters[type] === title}
                onChange={() => handleFilterOptionChange(type, title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;
