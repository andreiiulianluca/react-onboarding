import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { SearchFilterProvider } from "./contexts/SearchFilterContext"; // Correct path

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <SearchFilterProvider>
      <App />
    </SearchFilterProvider>
  </Provider>
);

reportWebVitals();
