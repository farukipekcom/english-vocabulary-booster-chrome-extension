import React, {useEffect, useState} from "react";
import range from "lodash/range";
import styles from "./Pagination.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
export interface Props {
  limit?: any;
  setPageNumber?: (pageNumber: number) => void;
  pageNumber?: number;
  wordFrom?: number;
  setWordFrom?: (pageNumber: number) => void;
  wordTo?: number;
  setWordTo?: (pageNumber: number) => void;
}
function Pagination(Props: Props) {
  const dispatch = useDispatch<any>();
  const {wordsResponse} = useSelector((state: any) => state.word);
  const {limit, setPageNumber, pageNumber, wordFrom, setWordFrom, wordTo, setWordTo} = Props;
  const pageCount = Math.ceil(wordsResponse?.length / limit);
  const pages = range(1, pageCount + 1);
  const previousPage = async () => {
    if (pageNumber - 1 === 0) return;
    setPageNumber(pageNumber - 1);
    setWordFrom(wordFrom - limit);
    await setWordTo(wordTo - limit);
  };
  const nextPage = async () => {
    if (pageNumber + 1 === pageCount + 1) return;
    setPageNumber(pageNumber + 1);
    setWordFrom(wordTo + 1);
    await setWordTo(wordTo + limit);
  };
  const setPage = (item) => {
    setPageNumber(item);
  };
  return (
    <div className={styles.pagination}>
      {pageNumber - 1 > 0 ? (
        <div className={styles.paginationPrevious} onClick={previousPage}>
          Previous
        </div>
      ) : (
        <div className={`${styles.paginationPrevious} ${styles.disabled}`} onClick={previousPage}>
          Previous
        </div>
      )}
      <div className={styles.paginationNumbers}>
        {pages.map((item) => (
          <span key={item}>
            {pageNumber === item ? (
              <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
                {pageNumber === item ? item : item}
              </div>
            ) : (
              <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
                {pageNumber === item ? item : item}
              </div>
            )}
          </span>
        ))}
      </div>
      {pageNumber < pageCount ? (
        <div className={styles.paginationNext} onClick={nextPage}>
          Next
        </div>
      ) : (
        <div className={`${styles.paginationNext} ${styles.disabled}`} onClick={nextPage}>
          Next
        </div>
      )}
    </div>
  );
}
export default Pagination;
