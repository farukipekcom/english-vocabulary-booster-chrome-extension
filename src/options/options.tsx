import React, {useEffect} from "react";
import "../styles/main.scss";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Mywords from "./pages/MyWords";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import Profile from "./pages/Settings/Profile";
import List from "./pages/Settings/List";
import Signup from "./pages/Signup";
const Options = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/mywords" element={<Mywords />}></Route>
        <Route path="/settings/*" element={<Settings />}>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="list" element={<List />}></Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};

export default Options;
