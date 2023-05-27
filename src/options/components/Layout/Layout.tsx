import React from "react";
import Header from "../Header/Header";
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
export default function Layout() {
  const {token} = useSelector((state: any) => state.word);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="main">
      <Header />
      <Outlet />
    </div>
  );
}
