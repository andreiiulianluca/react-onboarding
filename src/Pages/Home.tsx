import { useState } from "react";
import Filter from "../componentes/Filter/Filter";
import InfiniteScroll from "../componentes/InfiniteScroll/InfiniteScroll";
import Navbar from "../componentes/Navbar/Navbar";

const Home = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<String>("");
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  return (
    <div className="flex container mx-auto px-4">
      <Filter
        pageNumber={pageNumber}
        status={status}
        updateStatus={updateStatus}
        updateGender={updateGender}
        updateSpecies={updateSpecies}
        updatePageNumber={setPageNumber}
      />
      <InfiniteScroll />
    </div>
  );
};

export default Home;
