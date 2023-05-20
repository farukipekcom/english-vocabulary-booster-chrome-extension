import React from "react";
import {SearchIcon} from "../../components/icons/";
import styles from "./Search.module.scss";
import {useDispatch} from "react-redux";
import {setQuery} from "../../../stores/word";
import InputText from "../InputText/InputText";
function Search() {
  const dispatch = useDispatch();
  const onChange = (e) => {
    e.preventDefault();
    dispatch(setQuery(e.target.value));
  };
  return (
    <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputText className={styles.searchInput} onChange={onChange} name="search" placeholder="Search" />
    </div>
  );
}

export default Search;
