import React, {useState, useEffect} from "react";
import "./Table.scss";
import Pagination from "../../components/Pagination/Pagination";
import {useSelector} from "react-redux";
import Modal from "../Modal/Modal";
import {useDispatch} from "react-redux";
import {setModal, setWordId, fetchAllWords, fetchPageWords, deleteWord} from "../../../stores/word";
import TableItem from "../TableItem/TableItem";
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
