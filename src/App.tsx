import Navbar from "./componentes/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Characters from "./Pages/Characters";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import CharacterDetails from "./Pages/CharacterDetails";

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Navbar displaySearch={location.pathname !== "/"} />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/location" element={<Location />} />
        <Route path="/:id" element={<CharacterDetails />} />
        <Route path="/episodes/:id" element={<CharacterDetails />} />
        <Route path="/location/:id" element={<CharacterDetails />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
