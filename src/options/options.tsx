import React from "react";
import "../styles/main.scss";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Mywords from "./pages/MyWords";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import {Routes, Route} from "react-router-dom";
const Options = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/mywords" element={<Mywords />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default Options;
