import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./core/public/Home";
import SignUpPage from "./core/public/Signin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
