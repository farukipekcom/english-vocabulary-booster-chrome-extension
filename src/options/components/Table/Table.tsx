import React, {useState, useEffect} from "react";
import "./Table.scss";
import Pagination from "../../components/Pagination/Pagination";
import {useSelector} from "react-redux";
import Modal from "../Modal/Modal";
import {useDispatch} from "react-redux";
import {setModal, setWordId, setWords, setAllWords, deleteWord} from "../../../stores/word";
import TableItem from "../TableItem/TableItem";
function Table({limit, wordCount, category, setIsDeleting, isDeleting, setAddOrEdit, isAddOrEdit}) {
  const dispatch = useDispatch();
  const trigger = useSelector((state: any) => state.word.triggers);
  const data = useSelector((state: any) => state.word.words);
  const allWords = useSelector((state: any) => state.word.allWords);
  const modal = useSelector((state: any) => state.word.modals);
  const query = useSelector((state: any) => state.word.query);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    setIsModalActive(false);
    const getData = async () => {
      setIsLoadingData(false);
      await fetch(process.env.API_URL + `?page=${pageNumber}&limit=${limit}&orderBy=added_date&order=desc`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setWords(data));
          setIsLoadingData(true);
        });
      // chrome.storage.sync.get(["data"], (result) => {
      //   console.log("RESULT", result);
      // });
    };
    getData();
  }, [pageNumber, isDeleting, trigger]);

  useEffect(() => {
    const getAllData = async () => {
      await fetch(process.env.API_URL)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setAllWords(data));
          chrome.storage.sync.set({data: data}, () => {
            console.log("Data is set ", data);
          });
        });
    };
    getAllData();
  }, []);
  const handleEdit = (id) => {
    dispatch(setWordId(id));
    dispatch(setModal(true));
    setIsModalActive(!isModalActive);
    setAddOrEdit(true);
  };
  const handleDelete = (id) => {
    const status = dispatch(deleteWord(id));
    setIsDeleting(status && !isDeleting);
  };
  return (
    <>
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
        {isLoadingData &&
          !query &&
          category === "all" &&
          data.map((item) => <TableItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        {(query || category !== "all") &&
          allWords
            .filter(
              (item) =>
                (item.verb.length > 0 && category === "verb" && item.keyword.includes(query)) ||
                (item.noun.length > 0 && category === "noun" && item.keyword.includes(query)) ||
                (item.adjective.length > 0 && category === "adjective" && item.keyword.includes(query)) ||
                (item.adverb.length > 0 && category === "adverb" && item.keyword.includes(query)) ||
                (category === "all" && item.keyword.includes(query))
            )
            .map((item) => <TableItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        {!query && category === "all" && (
          <Pagination length={wordCount} limit={limit} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        )}
      </div>

      {modal && <Modal setIsModalActive={setIsModalActive} isModalActive={isModalActive} isAddOrEdit={isAddOrEdit} />}
    </>
  );
}

export default Table;
