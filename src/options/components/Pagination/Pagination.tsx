import React from "react";
import range from "lodash/range";
import styles from "./Pagination.module.scss";
import {useSelector} from "react-redux";
export interface Props {
  limit?: number;
  setPageNumber?: (pageNumber: number) => void;
  pageNumber?: number;
}
function Pagination(Props: Props) {
  const {allWordsCount} = useSelector((state: any) => state.word);
  const {limit, setPageNumber, pageNumber} = Props;
  const pageCount = Math.ceil(allWordsCount / limit);
  const pages = range(1, pageCount + 1);
  const previousPage = () => {
    if (pageNumber - 1 === 0) return;
    setPageNumber(pageNumber - 1);
  };
  const nextPage = () => {
    if (pageNumber + 1 === pageCount + 1) return;
    setPageNumber(pageNumber + 1);
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
