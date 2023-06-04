import React from "react";
import range from "lodash/range";
import styles from "./Pagination.module.scss";
import {useSelector} from "react-redux";
import {PaginationFunc} from "../../lib/pagination";
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
  const setPage = async (item) => {
    setPageNumber(item);
    setWordTo(item * limit - 1);
    setWordFrom(item * limit - limit);
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
        {pages.map((item: object, id: number) => {
          return <PaginationFunc key={id} id={id} pageNumber={pageNumber} item={item} styles={styles} pages={pages} setPage={setPage} />;
        })}
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
