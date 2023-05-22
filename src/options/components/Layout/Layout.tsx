import React, {useEffect} from "react";
import Header from "../Header/Header";
import {Navigate, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../../stores/word";
export default function Layout() {
  const {token} = useSelector((state: any) => state.word);
  if (!token) {
    return <Navigate to="/login" />;
  }
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div className="main">
      <Header />
      <Outlet />
    </div>
  );
}
