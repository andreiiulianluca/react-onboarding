import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Episodes from "./pages/Episodes/EpisodesPage";
import Locations from "./pages/Locations/LocationsPage";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetailsPage";
import Characters from "./pages/Characters/CharactersPage";
import NotFound from "./pages/NotFound/NotFoundPage";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Oops! Something went wrong...</h1>,
    children: [
      {
        path: "/",
        element: <Characters />,
      },
      {
        path: "episodes",
        element: <Episodes />,
      },
      {
        path: "locations",
        element: <Locations />,
      },
      {
        path: "character/:id",
        element: <CharacterDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
