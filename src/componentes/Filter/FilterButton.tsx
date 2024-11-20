import React from "react";
import styles from "./Filter.module.scss";

interface FilterButtonProps {
  input: string;
  task: (input: string) => void;
  updatePageNumber: (pageNumber: number) => void;
  index: number;
  name: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  input,
  task,
  updatePageNumber,
  index,
  name,
}) => {
  return (
    <div className={`form-check ${styles}`}>
      <button
        onClick={() => {
          task(input);
          updatePageNumber(1);
        }}
        className="btn p-1 border-black-300 border border-sky-600 focus:bg-sky-600 rounded-lg"
      >
        {input}
      </button>
    </div>
  );
};

export default FilterButton;
