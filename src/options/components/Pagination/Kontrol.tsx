import React from "react";

export const Kontrol = ({pageNumber, item, styles, pages, setPage}) => {
  if (pageNumber === item && item >= 7 && item < pages.length - 1) {
    return (
      <>
        <span key={item}>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            {pageNumber === item ? item - 1 : item - 1}
          </div>
        </span>
        <span key={item}>
          <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        <span key={item}>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            {pageNumber === item ? item + 1 : item + 1}
          </div>
        </span>
        <span key={item}>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            ...
          </div>
        </span>
      </>
    );
  }
  if (pageNumber === item && item === 6) {
    return (
      <>
        <span key={item}>
          <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        {pages.length !== 6 && (
          <span key={item}>
            <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
              ...
            </div>
          </span>
        )}
      </>
    );
  }
  if (pageNumber === item && item === 5) {
    return (
      <>
        <span key={item}>
          <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        {pages.length !== 5 && (
          <span key={item}>
            <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
              ...
            </div>
          </span>
        )}
      </>
    );
  }
  if (pageNumber === item) {
    return (
      <span key={item}>
        <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
          {pageNumber === item ? item : item}
        </div>
      </span>
    );
  }
  if (item === 5) {
    return (
      <>
        <span key={item}>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        {pages.length !== 5 && (
          <span key={item}>
            <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
              ...
            </div>
          </span>
        )}
      </>
    );
  }
  if (item <= 4 || item >= pages.length - 0) {
    return (
      <span key={item}>
        <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
          {pageNumber === item ? item : item}
        </div>
      </span>
    );
  }
};
