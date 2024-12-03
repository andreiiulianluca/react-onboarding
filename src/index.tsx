import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { SearchFilterProvider } from "./contexts/SearchFilterContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Episodes from "./pages/Episodes/EpisodesPage";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetailsPage";
import NotFound from "./pages/NotFound/NotFoundPage";
import CharactersPage from "./pages/Characters/CharactersPage";
import LocationsPage from "./pages/Locations/LocationsPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Oops! Something went wrong...</h1>,
    children: [
      {
        path: "/",
        element: <CharactersPage />,
      },
      { path: "/:id", element: <CharacterDetails /> },
      {
        path: "episode",
        element: <Episodes />,
      },
      { path: "episode/:id", element: <CharacterDetails /> },
      {
        path: "location",
        element: <LocationsPage />,
      },
      { path: "location/:id", element: <CharacterDetails /> },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <SearchFilterProvider>
      <RouterProvider router={router} />;
    </SearchFilterProvider>
  </Provider>
);

reportWebVitals();
