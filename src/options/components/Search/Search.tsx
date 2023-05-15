import React from "react";
import SearchIcon from "../../components/icons/search";
import "./Search.scss";
import {useDispatch} from "react-redux";
import {setQuery} from "../../../stores/word";
function Search() {
  const dispatch = useDispatch();
  const onChange = (e) => {
    e.preventDefault();
    dispatch(setQuery(e.target.value));
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
