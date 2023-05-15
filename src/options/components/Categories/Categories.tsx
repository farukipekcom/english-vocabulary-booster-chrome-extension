import React from "react";
import "./Categories.scss";
function Categories({category, setCategory}) {
  const setFilter = (value) => {
    setCategory(value);
  };
  return (
    <div className="categories">
      <div className={`categories-item ${category === "" ? "filter-active" : ""}`} onClick={() => setFilter("")}>
        View All
      </div>
      <div className={`categories-item ${category === "verb" ? "filter-active" : ""}`} onClick={() => setFilter("verb")}>
        Verb
      </div>
      <div className={`categories-item ${category === "noun" ? "filter-active" : ""}`} onClick={() => setFilter("noun")}>
        Noun
      </div>
      <div className={`categories-item ${category === "adjective" ? "filter-active" : ""}`} onClick={() => setFilter("adjective")}>
        Adjective
      </div>
      <div className={`categories-item ${category === "adverb" ? "filter-active" : ""}`} onClick={() => setFilter("adverb")}>
        Adverb
      </div>
    </div>
  );
}

export default Categories;
