import React from "react";
import "./Pagination.scss";
function Pagination({length, limit, setPageNumber, pageNumber}) {
  const pageCount = Math.ceil(length / limit);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
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
    <div className="pagination">
      {pageNumber - 1 > 0 ? (
        <div className="pagination-previous" onClick={previousPage}>
          Previous
        </div>
      ) : (
        <div className="pagination-previous disabled" onClick={previousPage}>
          Previous
        </div>
      )}
      <div className="pagination-numbers">
        {pages.map((item) => (
          <span key={item}>
            {pageNumber === item ? (
              <div className="pagination-numbers-item active" onClick={() => setPage(item)}>
                {pageNumber === item ? item : item}
              </div>
            ) : (
              <div className="pagination-numbers-item" onClick={() => setPage(item)}>
                {pageNumber === item ? item : item}
              </div>
            )}
          </span>
        ))}
      </div>
      {pageNumber < pageCount ? (
        <div className="pagination-next" onClick={nextPage}>
          Next
        </div>
      ) : (
        <div className="pagination-next disabled" onClick={nextPage}>
          Next
        </div>
      )}
    </div>
  );
}

export default Pagination;
