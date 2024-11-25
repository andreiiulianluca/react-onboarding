import { useEffect } from "react";
import Filter from "../componentes/Filter/Filter";
import CardContainer from "../componentes/CardContainer/CardContainer";
import { ScrollTypes } from "../componentes/CardContainer/CardContainerProps";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchCharacters, resetData } from "../features/charactersSlice";

const Characters = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    dispatch(resetData());
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <div className="flex container mx-auto px-4">
      <Filter />
      <CardContainer
        page="/character/"
        type={ScrollTypes.INFINITY}
        characters={data?.results || []}
        action={() => dispatch(fetchCharacters())}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Characters;