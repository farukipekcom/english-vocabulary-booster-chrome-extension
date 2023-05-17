import React from "react";
import DeleteIcon from "../icons/delete";
import EditIcon from "../icons/edit";
import "./TableItem.scss";
import {useSelector} from "react-redux";
function TableItem({item, handleDelete, handleEdit}) {
  const modals = useSelector((state: any) => state.word.modals);
  const wordId = useSelector((state: any) => state.word.wordId);
  return (
    <div className={`content-table-row ${item.id === wordId && modals ? "click" : "clicked"} `} key={item.id}>
      <div className="content-table-row-column">{item.keyword}</div>
      <div className="content-table-row-column">{item.replace}</div>
      <div className="content-table-row-column">{item.verb}</div>
      <div className="content-table-row-column">{item.noun}</div>
      <div className="content-table-row-column">{item.adjective}</div>
      <div className="content-table-row-column">{item.adverb}</div>
      <div className="content-table-row-column content-table-row-column-buttons">
        <div
          className="content-table-row-column-buttons-delete"
          onClick={() => {
            handleDelete(item.id);
          }}>
          <DeleteIcon />
        </div>
        <div className="content-table-row-column-buttons-edit" onClick={() => handleEdit(item.id)}>
          <EditIcon />
        </div>
      </div>
    </div>
  );
}

export default TableItem;
