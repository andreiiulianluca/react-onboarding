import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./componentes/Card/Card"; // Calea este corectă

let api = `https://rickandmortyapi.com/api/character/?page=1`;

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

function App() {
  const [fetchedData, updateFetchedData] = useState<FetchedData | null>(null);
  const { info, results } = fetchedData || { info: {}, results: [] };

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, []);

  if (!fetchedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1 className="text-center text-4xl font-bold mb-6">Characters</h1>
      <div className="flex container mx-auto px-4">
        <p>Filter component will be placed here</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {results.map((character) => (
            <Card key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
