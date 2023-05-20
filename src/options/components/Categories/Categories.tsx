import React from "react";
import styles from "./Categories.module.scss";
import CategoryItem from "../CategoryItem/CategoryItem";
function Categories() {
  const categories = ["All", "Verb", "Noun", "Adjective", "Adverb"];
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <CategoryItem key={category} category={category} />
      ))}
    </div>
  );
}

export default Categories;
