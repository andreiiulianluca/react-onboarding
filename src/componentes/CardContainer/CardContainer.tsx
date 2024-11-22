import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import Card from "../Card/Card";
import { AppDispatch } from "../../store";
import { incrementPageNumber } from "../../features/charactersSlice";

export enum ScrollTypes {
  NORMAL = "normal",
  INFINITY = "infinity",
}
interface CardContainerProps {
  type: ScrollTypes;
  characters: {
    id: number;
    image: string;
    name: string;
    location: { name: string; url: string };
    status: string;
  }[];
  isLoading: boolean;
  error: string | null;
  action: any;
}

const CardContainer: React.FC<CardContainerProps> = ({
  type = ScrollTypes.NORMAL,
  characters,
  isLoading,
  error,
  action,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isLoading
    ) {
      if (type === ScrollTypes.INFINITY) {
        dispatch(incrementPageNumber());
        dispatch(action);
      }
    }
  }, [dispatch, action, type, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CardContainer;
