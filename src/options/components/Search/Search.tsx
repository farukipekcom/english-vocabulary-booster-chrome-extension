import React from "react";
import SearchIcon from "../../components/icons/search";
import "./Search.scss";
function Search({setQuery}) {
  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  return (
    <div className="search">
      <div className="search-icon">
        <SearchIcon />
      </div>
      <input type="text" className="search-input" onChange={onChange} name="search" placeholder="Search" />
    </div>
  );
}

export default Search;
