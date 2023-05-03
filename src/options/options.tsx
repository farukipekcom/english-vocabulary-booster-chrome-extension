import React from "react";
import "../styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Settings from "./pages/settings";
import Mywords from "./pages/mywords";
const Options = () => {
  return (
    <div>
      {/* <ul>
        <li>
          <a href="#/">Home</a>
        </li>
        <li>
          <a href="#/settings">Settings</a>
        </li>
        <li>
          <a href="#/mywords">My Words</a>
        </li>
      </ul> */}
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/mywords" element={<Mywords />}></Route>
      </Routes>
    </div>
  );
};

export default Options;
