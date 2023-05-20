import React from "react";
import styles from "./Categories.module.scss";
export interface Props {
  category?: string;
  setCategory: (value: string) => void;
}
function Categories(Props: Props) {
  const {category, setCategory} = Props;
  const setFilter = (value) => {
    setCategory(value);
  };
  return (
    <div className={styles.categories}>
      <div className={`${styles.categoriesItem} ${category === "all" ? "activeCategory" : ""}`} onClick={() => setFilter("all")}>
        View All
      </div>
      <div className={`${styles.categoriesItem} ${category === "verb" ? "activeCategory" : ""}`} onClick={() => setFilter("verb")}>
        Verb
      </div>
      <div className={`${styles.categoriesItem} ${category === "noun" ? "activeCategory" : ""}`} onClick={() => setFilter("noun")}>
        Noun
      </div>
      <div
        className={`${styles.categoriesItem} ${category === "adjective" ? "activeCategory" : ""}`}
        onClick={() => setFilter("adjective")}>
        Adjective
      </div>
      <div className={`${styles.categoriesItem} ${category === "adverb" ? "activeCategory" : ""}`} onClick={() => setFilter("adverb")}>
        Adverb
      </div>
    </div>
  );
}

export default Categories;
