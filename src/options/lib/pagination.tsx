import React from "react";

export const PaginationFunc = ({id, pageNumber, item, styles, pages, setPage}) => {
  if (pageNumber === item && item >= 7 && item < pages.length - 1) {
    return (
      <React.Fragment key={id}>
        <span>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            {pageNumber === item ? item - 1 : item - 1}
          </div>
        </span>
        <span>
          <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        <span>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            {pageNumber === item ? item + 1 : item + 1}
          </div>
        </span>
        <span>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            ...
          </div>
        </span>
      </React.Fragment>
    );
  }
  if (pageNumber === item && item === 6) {
    return (
      <React.Fragment key={id}>
        <span>
          <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        {pages.length !== 6 && (
          <span>
            <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
              ...
            </div>
          </span>
        )}
      </React.Fragment>
    );
  }
  if (pageNumber === item && item === 5) {
    return (
      <React.Fragment key={id}>
        <span>
          <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        {pages.length !== 6 && (
          <span>
            <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
              ...
            </div>
          </span>
        )}
      </React.Fragment>
    );
  }
  if (pageNumber === item) {
    return (
      <span key={id}>
        <div className={`${styles.paginationNumbersItem} ${styles.active}`} onClick={() => setPage(item)}>
          {pageNumber === item ? item : item}
        </div>
      </span>
    );
  }
  if (item === 5) {
    return (
      <React.Fragment key={id}>
        <span>
          <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
            {pageNumber === item ? item : item}
          </div>
        </span>
        {pages.length !== 6 && (
          <span>
            <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
              ...
            </div>
          </span>
        )}
      </React.Fragment>
    );
  }
  if (item <= 4 || item >= pages.length - 0) {
    return (
      <span key={id}>
        <div className={styles.paginationNumbersItem} onClick={() => setPage(item)}>
          {pageNumber === item ? item : item}
        </div>
      </span>
    );
  }
};
