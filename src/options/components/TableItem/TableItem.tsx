import React from "react";
import styles from "./TableItem.module.scss";
import {DeleteIcon, EditIcon} from "../icons/";
import {useSelector} from "react-redux";
function TableItem({item, handleDelete, handleEdit}) {
  const {modal} = useSelector((state: any) => state.word);
  const {wordId} = useSelector((state: any) => state.word);
  return (
    <div className={`${styles.tableItemRow} ${item.word_id === wordId && modal ? styles.click : styles.clicked} `} key={item.word_id}>
      <div className={styles.tableItemRowColumn}>{item.word}</div>
      <div className={styles.tableItemRowColumn}>{item.meaning}</div>
      <div className={styles.tableItemRowColumn}>{item.verb}</div>
      <div className={styles.tableItemRowColumn}>{item.noun}</div>
      <div className={styles.tableItemRowColumn}>{item.adjective}</div>
      <div className={styles.tableItemRowColumn}>{item.adverb}</div>
      <div className={`${styles.tableItemRowColumn} ${styles.tableItemRowColumnButtons}`}>
        <div
          className={styles.tableItemRowColumnButtonsDelete}
          onClick={() => {
            handleDelete(item.word_id);
          }}>
          <DeleteIcon />
        </div>
        <div className={styles.tableItemRowColumnButtonsEdit} onClick={() => handleEdit(item.word_id)}>
          <EditIcon />
        </div>
      </div>
    </div>
  );
}
export default TableItem;
