import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./core/public/Home";
import SignInPage from "./core/public/Signin";
import SignUpPage from "./core/public/Signup";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
