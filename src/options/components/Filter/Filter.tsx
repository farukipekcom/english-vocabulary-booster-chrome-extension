import React from "react";
import "./Filter.scss";
import Search from "../Search/Search";
import Categories from "../Categories/Categories";
function Filter() {
  return (
    <div className="filter">
      <Categories />
      <Search />
    </div>
  );
}
export default Filter;
