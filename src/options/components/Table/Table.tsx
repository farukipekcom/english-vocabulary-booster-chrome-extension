import React, {useState, useEffect} from "react";
import styles from "./Table.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../Modal/Modal";
import TableItem from "../TableItem/TableItem";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setModal, setWordId, fetchAllWords, fetchPageWords, deleteWord, fetchSettings} from "../../../stores/word";
function Table({setAddOrEdit, isAddOrEdit}) {
  const dispatch = useDispatch<any>();
  const {
    deleteResponse,
    pageWordsResponse,
    pageWordsLoading,
    allWordsResponse,
    allWordsLoading,
    modal,
    query,
    trigger,
    activeCategory,
    settingsLoading,
    settingsResponse,
    settingsSuccess,
  } = useSelector((state: any) => state.word);
  const [limit, setLimit] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(fetchSettings());
  }, []);
  useEffect(() => {
    settingsSuccess && setLimit(settingsResponse?.word_limit);
  }, [settingsLoading]);
  useEffect(() => {
    settingsSuccess && dispatch(fetchPageWords({pageNumber, limit}));
  }, [pageNumber, trigger, deleteResponse, settingsSuccess, limit]);

  useEffect(() => {
    dispatch(fetchAllWords());
  }, [deleteResponse, trigger]);

  const handleEdit = (id) => {
    dispatch(setWordId(id));
    dispatch(setModal(true));
    setAddOrEdit(true);
  };
  const handleDelete = async (id: any) => {
    dispatch(deleteWord(id));
  };
  chrome.storage.sync.set({data: allWordsResponse}, () => {
    // console.log("Data is set ", allWordsResponse);
  });

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
          settingsSuccess &&
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
        {!query && settingsSuccess && activeCategory === "All" && (
          <Pagination limit={settingsResponse?.word_limit} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        )}
      </div>
      {modal && <Modal isAddOrEdit={isAddOrEdit} />}
    </>
  );
}
export default Table;
