import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

type FetchedData = {
  info: { count: number; pages: number; next: string; prev: string | null };
  results: {
    id: number;
    name: string;
    image: string;
    status: string;
    location: { name: string; url: string };
  }[];
};

const InfiniteScroll = () => {
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { results } = fetchedData || { info: {}, results: [] };
  console.log("FETCH", fetchedData);

  const fetchData = async () => {
    if (fetchedData && fetchedData.info.next === null) return;

    setIsLoading(true);
    setError(null);

    try {
      const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
      let data = await fetch(api).then((res) => res.json());
      setFetchedData((prevData) => ({
        info: data.info,
        results: prevData
          ? [
              ...new Map(
                [...prevData.results, ...data.results].map((item) => [
                  item.id,
                  item,
                ])
              ).values(),
            ]
          : data.results,
      }));
      setPageNumber((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isLoading
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 place-items-center">
      {results ? (
        results.map((character) => <Card key={character.id} {...character} />)
      ) : (
        <div className="m-auto">No results found</div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default InfiniteScroll;
