import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExperimentPage from "./pages/ExperimentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exp/:id" element={<ExperimentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;