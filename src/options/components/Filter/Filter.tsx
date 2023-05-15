import React from "react";
import "./Filter.scss";
import Search from "../Search/Search";
import Categories from "../Categories/Categories";
function Filter({category, setCategory}) {
  return (
    <div className="filter">
      <Categories category={category} setCategory={setCategory} />
      <Search />
    </div>
  );
}
export default Filter;
