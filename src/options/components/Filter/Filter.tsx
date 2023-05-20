import React from "react";
import styles from "./Filter.module.scss";
import Search from "../Search/Search";
import Categories from "../Categories/Categories";
function Filter() {
  return (
    <div className={styles.filter}>
      <Categories />
      <Search />
    </div>
  );
}
export default Filter;
