import React from "react";
import "../styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Settings from "./pages/settings";
const Options = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        <li>
          <a href="#/">Home</a>
        </li>
        <li>
          <a href="#/settings">Settings</a>
        </li>
      </ul>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
};

export default Options;
