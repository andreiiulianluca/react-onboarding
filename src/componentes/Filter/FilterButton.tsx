import styles from "./Filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../../store/slices/search/slice";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { resetData } from "../../store/slices/characters/slice";
import FilterButtonProps from "./FilterButtonProps";
import { AppDispatch, RootState } from "../../store";

const FilterButton = ({ type, input, action }: FilterButtonProps) => {
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
