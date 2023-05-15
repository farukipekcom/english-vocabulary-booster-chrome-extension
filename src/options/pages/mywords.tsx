import React, {useEffect, useRef, useState} from "react";
import DeleteIcon from "../components/icons/delete";
import EditIcon from "../components/icons/edit";
import AddWord from "../components/AddWord/AddWord";
import EditWord from "../components/EditWord/EditWord";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import Button from "../components/Button/Button";
import Filter from "../components/Filter/Filter";
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
            <div onClick={handleAdd}>
              <Button text="Add Word" icon={true} />
            </div>
          </div>
        </div>
        <Filter category={category} setCategory={setCategory} setQuery={setQuery} />
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
            <EditWord
              setIsEditWordActive={setIsEditWordActive}
              wordId={wordId}
              setWordId={setWordId}
              // setSinif={setSinif}
              // sinif={sinif}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          </div>
        )}
        <div ref={ref}></div>
      </main>
    </div>
  );
}

export default Mywords;
