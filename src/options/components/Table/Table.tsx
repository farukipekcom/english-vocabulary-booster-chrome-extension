import React, {useState, useEffect} from "react";
import styles from "./Table.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../Modal/Modal";
import TableItem from "../TableItem/TableItem";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setModal, setWordId, fetchPageWords, deleteWord, fetchSettings, fetchWords} from "../../../stores/word";
function Table({setAddOrEdit, isAddOrEdit}) {
  useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchWords());
  }, []);
  const dispatch = useDispatch<any>();
  const {
    deleteResponse,
    allWordsResponse,
    modal,
    query,
    trigger,
    activeCategory,
    settingsResponse,
    settingsSuccess,
    settingsLoading,
    wordsResponse,
    wordsSuccess,
    pageWordsSuccess,
    pageWordsResponse,
  } = useSelector((state: any) => state.word);

  const [limit, setLimit] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [wordFrom, setWordFrom] = useState(0);
  const [wordTo, setWordTo] = useState(settingsResponse?.word_limit - 1);
  useEffect(() => {
    settingsSuccess && setLimit(settingsResponse?.word_limit);
    setWordTo(settingsResponse?.word_limit - 1);
  }, [settingsLoading]);
  useEffect(() => {}, [pageNumber, trigger, deleteResponse, settingsSuccess]);

  useEffect(() => {
    dispatch(fetchWords());
  }, [deleteResponse, trigger]);
  const handleEdit = (id) => {
    dispatch(setWordId(id));
    dispatch(setModal(true));
    setAddOrEdit(true);
  };
  useEffect(() => {
    settingsSuccess && dispatch(fetchPageWords({wordFrom, wordTo}));
  }, [wordFrom, wordTo, pageNumber, trigger, deleteResponse]);
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
        {pageWordsSuccess &&
          settingsSuccess &&
          !query &&
          activeCategory === "All" &&
          pageWordsResponse.map((item) => <TableItem key={item.word_id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        {wordsSuccess &&
          (query || activeCategory !== "All") &&
          wordsResponse
            .filter(
              (item: any) =>
                (item.verb?.length > 0 && activeCategory === "Verb" && item.word.includes(query)) ||
                (item.noun?.length > 0 && activeCategory === "Noun" && item.word.includes(query)) ||
                (item.adjective?.length > 0 && activeCategory === "Adjective" && item.word.includes(query)) ||
                (item.adverb?.length > 0 && activeCategory === "Adverb" && item.word.includes(query)) ||
                (activeCategory === "All" && item.word.includes(query))
            )
            .map((item) => <TableItem key={item.word_id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        {!query && settingsSuccess && activeCategory === "All" && (
          <Pagination
            limit={settingsResponse?.word_limit}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            wordFrom={wordFrom}
            setWordFrom={setWordFrom}
            wordTo={wordTo}
            setWordTo={setWordTo}
          />
        )}
      </div>
      {modal && <Modal isAddOrEdit={isAddOrEdit} />}
    </>
  );
}
export default Table;
