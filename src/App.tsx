import { useEffect, useState } from "react";
import "./App.css";
import Card from "./componentes/Card/Card";
import Navbar from "./componentes/Navbar/Navbar";
import InfiniteScroll from "./componentes/InfiniteScroll/InfiniteScroll";

function App() {
  const [pageNumber, setPageNumber] = useState<Number>(1);
  const [searchValue, setSearchValue] = useState<String>("");

  return (
    <div className="App">
      <Navbar setSearch={setSearchValue} updatePageNumber={setPageNumber} />
      <div className="flex container mx-auto px-4">
        <p>Filter component will be placed here</p>
        <InfiniteScroll />
      </div>
    </div>
  );
}

export default App;
