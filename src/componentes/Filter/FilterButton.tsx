import React from "react";
import styles from "./Filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setPageNumber } from "../../features/searchSlice";
import { resetData, fetchCharacters } from "../../features/charactersSlice";

interface FilterButtonProps {
  key: number;
  type: string;
  input: string;
  action: (
    input: string
  ) => { type: string; payload: any } | ((dispatch: AppDispatch) => void);
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, input, action }) => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filter);
  const { gender, status, species } = filters;

  const handleClick = () => {
    dispatch(action(input));
    dispatch(setPageNumber(1));
    dispatch(resetData());
    dispatch(fetchCharacters());
  };

  const isSelected = (type: string) => {
    switch (type) {
      case "gender":
        return gender === input;
      case "status":
        return status === input;
      case "species":
        return species === input;
    }
  };

  return (
    <div className={`form-check ${styles}`}>
      <button
        onClick={() => handleClick()}
        className={`btn p-1 border-black-300 border ${
          isSelected(type) ? "bg-sky-600 text-white" : "border-sky-600"
        } focus:bg-sky-600 rounded-lg`}
      >
        {input}
      </button>
    </div>
  );
};

export default FilterButton;
