import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import { useSearchFilterContext } from "./contexts/SearchFilterContext";

const App = () => {
  const currentLocation = useLocation();
  const { searchTerm, setSearchTerm } = useSearchFilterContext();
  const headerHasSearchBar =
    currentLocation.pathname === "/" ||
    currentLocation.pathname === "/characters";

  return (
    <>
      <Header
        searchInputValue={searchTerm}
        onSearchInputChange={setSearchTerm}
        headerHasSearchBar={headerHasSearchBar}
      />
      <Outlet />
    </>
  );
};

export default App;
