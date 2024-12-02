import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Episodes from "./pages/Episodes/EpisodesPage";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetailsPage";
import NotFound from "./pages/NotFound/NotFoundPage";
import CharactersPage from "./pages/Characters/CharactersPage";
import LocationsPage from "./pages/Locations/LocationsPage";

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
        element: <Outlet />,
        children: [
          { index: true, element: <CharactersPage /> },
          { path: ":id", element: <CharacterDetails /> },
        ],
      },
      {
        path: "episodes",
        element: <Outlet />,
        children: [
          { index: true, element: <Episodes /> },
          { path: ":id", element: <CharacterDetails /> },
        ],
      },
      {
        path: "locations",
        element: <Outlet />,
        children: [
          { index: true, element: <LocationsPage /> },
          { path: ":id", element: <CharacterDetails /> },
        ],
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
