import React from "react";
import PageTitle from "../components/PageTitle/PageTitle";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
function Home() {
  return (
    <div className="content">
      <PageTitle title="Welcome back, Faruk" />
    </div>
  );
}

export default Home;
