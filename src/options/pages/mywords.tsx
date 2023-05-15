import React, {useEffect, useRef, useState} from "react";
import AddWord from "../components/AddWord/AddWord";
import EditWord from "../components/EditWord/EditWord";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Filter from "../components/Filter/Filter";
import Table from "../components/Table/Table";
function Mywords() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddWordActive, setIsAddWordActive] = useState(false);
  const [isEditWordActive, setIsEditWordActive] = useState(false);
  const [wordId, setWordId] = useState("");
  const [clicked, setClicked] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [wordCount, setWordCount] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const limit = 8;
  useEffect(() => {
    setLoading(false);
    setLoading2(false);
    fetch(process.env.API_URL)
      .then((res) => res.json())
      .then((data) => {
        setWordCount(data);
        setLoading(true);
        chrome.storage.sync.set({data: data}, () => {
          console.log("Data is set ", data);
        });
      });
    fetch(process.env.API_URL + `?page=${pageNumber}&limit=${limit}&orderBy=added_date&order=desc`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading2(true);
      });
    chrome.storage.sync.get(["data"], (result) => {
      console.log("RESULT", result);
    });
  }, [pageNumber, isEditing, isDeleting, isAdding]);
  const handleDelete = (id) => {
    fetch(process.env.API_URL + id, {
      method: "DELETE",
    }).then(() => {
      setIsDeleting(!isDeleting);
    });
  };
  const handleAdd = () => {
    setIsAddWordActive(!isAddWordActive);
  };
  const handleEdit = (id) => {
    setWordId(id);
    setIsEditWordActive(true);
  };
  const ref = useRef(null);

  return (
    <div className="main">
      <Header />
      <main className="content">
        <div className="content-heading">
          <div className="content-heading-left">
            <div className="content-heading-left-title">My Words</div>
            <div className="content-heading-left-subtitle">You can add words to make it easier to understand what you read.</div>
          </div>
          <div className="content-heading-right">
            <Button text="Add Word" icon={true} onClick={handleAdd} />
          </div>
        </div>
        <Filter category={category} setCategory={setCategory} setQuery={setQuery} />
        <Table
          isLoading={isLoading}
          isLoading2={isLoading2}
          setCategory={setCategory}
          limit={limit}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          wordCount={wordCount}
          category={category}
          query={query}
          data={data}
          wordId={wordId}
          clicked={clicked}
          setClicked={setClicked}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        {isAddWordActive && (
          <div className="content-add">
            <div className="content-add-background" onClick={() => setIsAddWordActive(!isAddWordActive)}></div>
            <AddWord isAdding={isAdding} setIsAdding={setIsAdding} setIsAddWordActive={setIsAddWordActive} refValue={ref} />
          </div>
        )}
        {isEditWordActive && (
          <div className="content-edit">
            <div
              className="content-edit-background"
              onClick={() => {
                setIsEditWordActive(!isEditWordActive);
                setClicked("clicked");
              }}></div>
            <EditWord setIsEditWordActive={setIsEditWordActive} wordId={wordId} setIsEditing={setIsEditing} isEditing={isEditing} />
          </div>
        )}
        <div ref={ref}></div>
      </main>
    </div>
  );
}

export default Mywords;
