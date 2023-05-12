import React, {useEffect, useRef, useState} from "react";
import SearchIcon from "../components/icons/search";
import PlusIcon from "../components/icons/plus";
import DeleteIcon from "../components/icons/delete";
import EditIcon from "../components/icons/edit";
import AddWord from "../components/AddWord/AddWord";
import EditWord from "../components/EditWord/EditWord";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
function Mywords() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddWordActive, setIsAddWordActive] = useState(false);
  const [isEditWordActive, setIsEditWordActive] = useState(false);
  const [wordId, setWordId] = useState("");
  const [clicked, setClicked] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [wordCount, setWordCount] = useState([]);
  const [query, setQuery] = useState("");
  const limit = 10;
  useEffect(() => {
    setLoading(false);
    fetch(process.env.API_URL)
      .then((res) => res.json())
      .then((data) => {
        setWordCount(data);
        setLoading(true);
        chrome.storage.sync.set({data: data}, () => {
          console.log("Data is set ", data);
        });
      });
    fetch(process.env.API_URL + `?page=${pageNumber}&limit=${limit}&orderBy=added_date&order=asc`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(true);
      });
    chrome.storage.sync.get(["data"], (result) => {
      console.log("RESULT", result);
    });
  }, [pageNumber, isEditing, isDeleting]);
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
  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  console.log(query);
  const ref = useRef(null);
  return (
    <div className="main">
      <Header />
      <main className="content">
        <div className="content-heading">
          <div className="content-heading-left">
            <div className="content-heading-left-title">My Words</div>
            <div className="content-heading-left-subtitle">Lorem ipsum consectetur adipiscing elit duis tristique sollicitudin.</div>
          </div>
          <div className="content-heading-right">
            <div className="content-heading-right-button" onClick={handleAdd}>
              <div className="content-heading-right-button-icon">
                <PlusIcon />
              </div>
              <div className="content-heading-right-button-text">Add</div>
            </div>
          </div>
        </div>
        <div className="content-filter">
          <div className="content-filter-categories">
            <div className="content-filter-categories-item filter-active">View All</div>
            <div className="content-filter-categories-item">Verb</div>
            <div className="content-filter-categories-item">Noun</div>
            <div className="content-filter-categories-item">Adjective</div>
            <div className="content-filter-categories-item">Adverb</div>
          </div>
          <div className="content-filter-search">
            <div className="content-filter-search-icon">
              <SearchIcon />
            </div>
            <input type="text" className="content-filter-search-input" onChange={onChange} name="search" placeholder="Search" />
          </div>
        </div>
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
          {isLoading &&
            !query &&
            data
              .filter((item) => item.keyword.toLowerCase().includes(query))
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
              .filter((item) => item.keyword.toLowerCase().includes(query))
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
            <AddWord isDeleting={isDeleting} setIsDeleting={setIsDeleting} setIsAddWordActive={setIsAddWordActive} refValue={ref} />
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
