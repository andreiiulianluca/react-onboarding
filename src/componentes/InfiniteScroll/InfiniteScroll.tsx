import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchCharacters } from "../../features/infiniteScrollSlice";
import Card from "../Card/Card";

const InfiniteScroll: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error, search } = useSelector(
    (state: RootState) => state.infiniteScroll
  );
  const results = data?.results || [];

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isLoading
    ) {
      dispatch(fetchCharacters());
    }
  };

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch, search]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 place-items-center">
      {results.length > 0 ? (
        results.map((character) => <Card key={character.id} {...character} />)
      ) : (
        <div className="m-auto">No results found</div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default InfiniteScroll;
