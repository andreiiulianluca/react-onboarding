import React from "react";
import { useDispatch } from "react-redux";
import Card from "../Card/Card";
import { CardContainerProps } from "./CardContainerProps";
import { AppDispatch } from "../../store";
import { incrementPageNumber } from "../../store/slices/characters/slice";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const CardContainer = ({
  type = "normal",
  characters,
  isLoading,
  error,
  action,
}: CardContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const loadMore = () => {
    if (type === "infinity") {
      dispatch(incrementPageNumber());
      dispatch(action);
    }
  };

  useInfiniteScroll({ isLoading, onLoadMore: loadMore });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 place-items-center">
      {characters
        ? characters.map((character) => (
            <Card
              key={character.id}
              id={character.id}
              image={character.image}
              name={character.name}
              location={character.location}
              status={character.status}
            />
          ))
        : !isLoading && <div className="m-auto">No results found</div>}
      {isLoading && <div className="text-center mt-5">Loading...</div>}
      {error && (
        <div className="text-center mt-5 text-red-500">Error: {error}</div>
      )}
    </div>
  );
};

export default CardContainer;
