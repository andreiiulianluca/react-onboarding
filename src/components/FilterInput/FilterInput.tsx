import React from "react";
import styles from "./FilterInput.module.scss";

const FilterInput = ({
  name,
  total,
  value,
  action,
}: {
  total: number;
  name: string;
  value: number;
  action: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <select
          onChange={action}
          value={value}
          id="episode-select"
          className={styles.select}
        >
          {[...Array(total).keys()].map((_, index) => (
            <option key={index} value={index + 1}>
              {name} - {index + 1}
            </option>
          ))}
        </select>
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterInput;
