import React, {useState, useEffect} from "react";
import styles from "./Table.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../Modal/Modal";
import TableItem from "../TableItem/TableItem";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setModal, setWordId, fetchAllWords, fetchPageWords, deleteWord} from "../../../stores/word";
function Table({limit, setAddOrEdit, isAddOrEdit}) {
  const dispatch = useDispatch<any>();
  const {deleteResponse, pageWordsResponse, pageWordsLoading, allWordsResponse, allWordsLoading, modal, query, trigger, activeCategory} =
    useSelector((state: any) => state.word);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(fetchPageWords({pageNumber, limit}));
  }, [pageNumber, trigger, deleteResponse]);
  useEffect(() => {
    dispatch(fetchAllWords());
  }, [deleteResponse]);
  const handleEdit = (id) => {
    dispatch(setWordId(id));
    dispatch(setModal(true));
    setAddOrEdit(true);
  };
  const handleDelete = async (id: any) => {
    dispatch(deleteWord(id));
  };
  return (
    <>
      <div className={styles.table}>
        <div className={`${styles.tableRow} ${styles.tableHeading}`}>
          <div className={styles.tableRowColumn}>Word</div>
          <div className={styles.tableRowColumn}>Meaning</div>
          <div className={styles.tableRowColumn}>Verb</div>
          <div className={styles.tableRowColumn}>Noun</div>
          <div className={styles.tableRowColumn}>Adjective</div>
          <div className={styles.tableRowColumn}>Adverb</div>
          <div className={`${styles.tableRowColumn} ${styles.tableRowColumnButtons}`}></div>
        </div>
        {!pageWordsLoading &&
          !query &&
          activeCategory === "All" &&
          pageWordsResponse.map((item) => <TableItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        {!allWordsLoading && allWordsResponse.length > 0 && (query || activeCategory !== "All")
          ? allWordsResponse
              .filter(
                (item) =>
                  (item.verb.length > 0 && activeCategory === "Verb" && item.keyword.includes(query)) ||
                  (item.noun.length > 0 && activeCategory === "Noun" && item.keyword.includes(query)) ||
                  (item.adjective.length > 0 && activeCategory === "Adjective" && item.keyword.includes(query)) ||
                  (item.adverb.length > 0 && activeCategory === "Adverb" && item.keyword.includes(query)) ||
                  (activeCategory === "All" && item.keyword.includes(query))
              )
              .map((item) => <TableItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} />)
          : ""}
        {!query && activeCategory === "All" && <Pagination limit={limit} pageNumber={pageNumber} setPageNumber={setPageNumber} />}
      </div>
      {modal && <Modal isAddOrEdit={isAddOrEdit} />}
    </>
  );
}
export default Table;
