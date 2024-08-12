import React from "react";
import SignUp from "./Components/SIgnUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Footer from "./Footer";
import Nav from "./Components/Nav";
export default function App() {
  return (
    <Router>
      <> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    <Footer/>
    </Router>
  );
}
