import { useState } from "react";
import FilterButton from "../Filter/FilterButton";
import { filterOptions } from "../../utils/constants";
import styles from "./FilterDropdown.module.scss";
import { FilterDropdownType } from "./FilterDropDownProps";

const FilterDropdown = ({
  title,
  type,
  action,
}: {
  title: string;
  type: FilterDropdownType;
  action: any;
}) => {
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
        className={`${styles.accordionCollapse} ${isOpen ? styles.open : ""}`}
        aria-labelledby="headingOne"
      >
        <div className={styles.accordionBody}>
          <div className={styles.filterOptions}>
            {(filterOptions[type] || []).map((item, index) => (
              <FilterButton
                key={index}
                type={type}
                action={action}
                input={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
