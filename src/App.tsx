import "./App.css";
import Navbar from "./componentes/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./Pages/Characters";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/location" element={<Location />} />
        {/* <Route path="/:id" element={<CardDetails />} />

        <Route path="/episodes/:id" element={<CardDetails />} />

        <Route path="/location/:id" element={<CardDetails />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
