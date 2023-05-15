import React from "react";
import SearchIcon from "../../components/icons/search";
import "./Filter.scss";
function Filter({category, setCategory, setQuery}) {
  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  const setFilter = (value) => {
    setCategory(value);
  };
  return (
    <div className="content-filter">
      <div className="content-filter-categories">
        <div className={`content-filter-categories-item ${category === "" ? "filter-active" : ""}`} onClick={() => setFilter("")}>
          View All
        </div>
        <div className={`content-filter-categories-item ${category === "verb" ? "filter-active" : ""}`} onClick={() => setFilter("verb")}>
          Verb
        </div>
        <div className={`content-filter-categories-item ${category === "noun" ? "filter-active" : ""}`} onClick={() => setFilter("noun")}>
          Noun
        </div>
        <div
          className={`content-filter-categories-item ${category === "adjective" ? "filter-active" : ""}`}
          onClick={() => setFilter("adjective")}>
          Adjective
        </div>
        <div
          className={`content-filter-categories-item ${category === "adverb" ? "filter-active" : ""}`}
          onClick={() => setFilter("adverb")}>
          Adverb
        </div>
      </div>
      <div className="content-filter-search">
        <div className="content-filter-search-icon">
          <SearchIcon />
        </div>
        <input type="text" className="content-filter-search-input" onChange={onChange} name="search" placeholder="Search" />
      </div>
    </div>
  );
}

export default Filter;
