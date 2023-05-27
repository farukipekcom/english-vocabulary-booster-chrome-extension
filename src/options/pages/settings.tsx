import React from "react";
import Profile from "./Settings/Profile";
import {Routes, Route} from "react-router-dom";
import Layout from "./Settings/Layout";
import List from "./Settings/List";
function Settings() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/list" element={<List />}></Route>
      </Route>
    </Routes>
  );
}
export default Settings;
