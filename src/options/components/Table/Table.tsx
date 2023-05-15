import React from "react";
import "./Table.scss";
import DeleteIcon from "../../components/icons/delete";
import EditIcon from "../../components/icons/edit";
import Pagination from "../../components/Pagination/Pagination";
function Table({
  isLoading,
  isLoading2,
  setCategory,
  limit,
  pageNumber,
  setPageNumber,
  wordCount,
  category,
  query,
  data,
  wordId,
  clicked,
  setClicked,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="content-table">
      <div className="content-table-row content-table-heading">
        <div className="content-table-row-column">Word</div>
        <div className="content-table-row-column">Meaning</div>
        <div className="content-table-row-column">Verb</div>
        <div className="content-table-row-column">Noun</div>
        <div className="content-table-row-column">Adjective</div>
        <div className="content-table-row-column">Adverb</div>
        <div className="content-table-row-column content-table-row-column-buttons"></div>
      </div>
      {isLoading2 &&
        !category &&
        !query &&
        data.map((item) =>
          item.id == wordId ? (
            <div className={`content-table-row ${clicked} `} key={item.id}>
              <div className="content-table-row-column">{item.keyword}</div>
              <div className="content-table-row-column">{item.replace}</div>
              <div className="content-table-row-column">{item.verb}</div>
              <div className="content-table-row-column">{item.noun}</div>
              <div className="content-table-row-column">{item.adjective}</div>
              <div className="content-table-row-column">{item.adverb}</div>
              <div className="content-table-row-column content-table-row-column-buttons">
                <div className="content-table-row-column-buttons-delete" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </div>
                <div className="content-table-row-column-buttons-edit" onClick={() => handleEdit(item.id)}>
                  <EditIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className="content-table-row" key={item.id}>
              <div className="content-table-row-column">{item.keyword}</div>
              <div className="content-table-row-column">{item.replace}</div>
              <div className="content-table-row-column">{item.verb}</div>
              <div className="content-table-row-column">{item.noun}</div>
              <div className="content-table-row-column">{item.adjective}</div>
              <div className="content-table-row-column">{item.adverb}</div>
              <div className="content-table-row-column content-table-row-column-buttons">
                <div className="content-table-row-column-buttons-delete" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </div>
                <div
                  className="content-table-row-column-buttons-edit"
                  onClick={() => {
                    handleEdit(item.id);
                    setClicked("click");
                  }}>
                  <EditIcon />
                </div>
              </div>
            </div>
          )
        )}
      {isLoading &&
        category &&
        wordCount
          .filter(
            (item) =>
              (item.verb.length > 0 && category === "verb") ||
              (item.noun.length > 0 && category === "noun") ||
              (item.adjective.length > 0 && category === "adjective") ||
              (item.adverb.length > 0 && category === "adverb") ||
              (category === "allWord" && setCategory(""))
          )
          .map((item) =>
            item.id == wordId ? (
              <div className={`content-table-row ${clicked} `} key={item.id}>
                <div className="content-table-row-column">{item.keyword}</div>
                <div className="content-table-row-column">{item.replace}</div>
                <div className="content-table-row-column">{item.verb}</div>
                <div className="content-table-row-column">{item.noun}</div>
                <div className="content-table-row-column">{item.adjective}</div>
                <div className="content-table-row-column">{item.adverb}</div>
                <div className="content-table-row-column content-table-row-column-buttons">
                  <div className="content-table-row-column-buttons-delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </div>
                  <div className="content-table-row-column-buttons-edit" onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-table-row" key={item.id}>
                <div className="content-table-row-column">{item.keyword}</div>
                <div className="content-table-row-column">{item.replace}</div>
                <div className="content-table-row-column">{item.verb}</div>
                <div className="content-table-row-column">{item.noun}</div>
                <div className="content-table-row-column">{item.adjective}</div>
                <div className="content-table-row-column">{item.adverb}</div>
                <div className="content-table-row-column content-table-row-column-buttons">
                  <div className="content-table-row-column-buttons-delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </div>
                  <div
                    className="content-table-row-column-buttons-edit"
                    onClick={() => {
                      handleEdit(item.id);
                      setClicked("click");
                    }}>
                    <EditIcon />
                  </div>
                </div>
              </div>
            )
          )}
      {isLoading &&
        query &&
        wordCount
          .filter((item) => item.keyword.includes(query))
          .map((item) =>
            item.id == wordId ? (
              <div className={`content-table-row ${clicked} `} key={item.id}>
                <div className="content-table-row-column">{item.keyword}</div>
                <div className="content-table-row-column">{item.replace}</div>
                <div className="content-table-row-column">{item.verb}</div>
                <div className="content-table-row-column">{item.noun}</div>
                <div className="content-table-row-column">{item.adjective}</div>
                <div className="content-table-row-column">{item.adverb}</div>
                <div className="content-table-row-column content-table-row-column-buttons">
                  <div className="content-table-row-column-buttons-delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </div>
                  <div className="content-table-row-column-buttons-edit" onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-table-row" key={item.id}>
                <div className="content-table-row-column">{item.keyword}</div>
                <div className="content-table-row-column">{item.replace}</div>
                <div className="content-table-row-column">{item.verb}</div>
                <div className="content-table-row-column">{item.noun}</div>
                <div className="content-table-row-column">{item.adjective}</div>
                <div className="content-table-row-column">{item.adverb}</div>
                <div className="content-table-row-column content-table-row-column-buttons">
                  <div className="content-table-row-column-buttons-delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </div>
                  <div
                    className="content-table-row-column-buttons-edit"
                    onClick={() => {
                      handleEdit(item.id);
                      setClicked("click");
                    }}>
                    <EditIcon />
                  </div>
                </div>
              </div>
            )
          )}
      <Pagination length={wordCount.length} limit={limit} pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
}

export default Table;
