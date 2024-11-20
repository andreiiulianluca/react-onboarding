import { useState } from "react";
import "./App.css";
import Navbar from "./componentes/Navbar/Navbar";
import InfiniteScroll from "./componentes/InfiniteScroll/InfiniteScroll";
import Filter from "./componentes/Filter/Filter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/:id" element={<CardDetails />} />

        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetails />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CardDetails />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
