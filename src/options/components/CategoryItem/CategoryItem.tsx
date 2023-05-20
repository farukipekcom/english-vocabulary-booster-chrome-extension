import React from "react";
import styles from "./CategoryItem.module.scss";
import {setActiveCategory} from "../../../stores/word";
import {useDispatch, useSelector} from "react-redux";
export default function CategoryItem({category}) {
  const dispatch = useDispatch();
  const {activeCategory} = useSelector((state: any) => state.word);
  return (
    <div
      className={`${styles.categoryItem} ${activeCategory === category ? "activeCategory" : ""}`}
      onClick={() => dispatch(setActiveCategory(category))}>
      {category}
    </div>
  );
}
