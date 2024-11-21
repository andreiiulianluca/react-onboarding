import Filter from "../componentes/Filter/Filter";
import InfiniteScroll from "../componentes/InfiniteScroll/InfiniteScroll";

const Home = () => {
  return (
    <div className="flex container mx-auto px-4">
      <Filter />
      <InfiniteScroll />
    </div>
  );
};

export default Home;
