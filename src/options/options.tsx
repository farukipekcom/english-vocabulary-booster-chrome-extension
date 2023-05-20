import React from "react";
import "../styles/main.scss";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Mywords from "./pages/MyWords";
import Header from "./components/Header/Header";
const Options = () => {
  return (
    <div className="main">
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/mywords" element={<Mywords />}></Route>
      </Routes>
      <Header />
    </div>
  );
};

export default Options;
