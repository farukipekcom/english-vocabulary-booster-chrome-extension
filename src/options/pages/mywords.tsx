import React, { useEffect, useState } from "react";
import SearchIcon from "../components/icons/search";
import PlusIcon from "../components/icons/plus";
import DeleteIcon from "../components/icons/delete";
import EditIcon from "../components/icons/edit";
import DashboardICon from "../components/icons/dashboard";
import MyWordIcon from "../components/icons/myword";
import SettingsIcon from "../components/icons/settings";
import Logo from "../components/icons/logo";
import AddWord from "../components/AddWord/AddWord";
import EditWord from "../components/EditWord/EditWord";
function Mywords() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddWordActive, setIsAddWordActive] = useState(false);
  const [isEditWordActive, setIsEditWordActive] = useState(false);
  const [wordId, setWordId] = useState("");
  useEffect(() => {
    setLoading(false);
    fetch(process.env.API_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(true);
      });
  }, [isEditing, isDeleting]);
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

  return (
    <div className="main">
      <header className="header">
        <div className="header-logo">
          <Logo />
        </div>
        <div className="header-menu">
          <div className="header-menu-item">
            <div className="header-menu-item-icon">
              <DashboardICon />
            </div>
            <div className="header-menu-item-text">Dashboard</div>
          </div>
          <div className="header-menu-item">
            <div className="header-menu-item-icon">
              <MyWordIcon />
            </div>
            <div className="header-menu-item-text">My Words</div>
          </div>
          <div className="header-menu-item">
            <div className="header-menu-item-icon">
              <SettingsIcon />
            </div>
            <div className="header-menu-item-text">Settings</div>
          </div>
        </div>
        <div className="header-total">
          <div className="header-total-heading">Total Words</div>
          <div className="header-total-count">274</div>
        </div>
      </header>
      <main className="content">
        <div className="content-heading">
          <div className="content-heading-left">
            <div className="content-heading-left-title">My Words</div>
            <div className="content-heading-left-subtitle">
              Lorem ipsum consectetur adipiscing elit duis tristique
              sollicitudin.
            </div>
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
            <div className="content-filter-categories-item filter-active">
              View All
            </div>
            <div className="content-filter-categories-item">Verb</div>
            <div className="content-filter-categories-item">Noun</div>
            <div className="content-filter-categories-item">Adjective</div>
            <div className="content-filter-categories-item">Adverb</div>
          </div>
          <div className="content-filter-search">
            <div className="content-filter-search-icon">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="content-filter-search-input"
              name="search"
              placeholder="Search"
            />
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
            data.map((item) => (
              <div className="content-table-row" key={item.id}>
                <div className="content-table-row-column">{item.keyword}</div>
                <div className="content-table-row-column">{item.replace}</div>
                <div className="content-table-row-column">{item.verb}</div>
                <div className="content-table-row-column">{item.noun}</div>
                <div className="content-table-row-column">{item.adjective}</div>
                <div className="content-table-row-column">{item.adverb}</div>
                <div className="content-table-row-column content-table-row-column-buttons">
                  <div
                    className="content-table-row-column-buttons-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </div>
                  <div
                    className="content-table-row-column-buttons-edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    <EditIcon />
                  </div>
                </div>
              </div>
            ))}
        </div>
        {isAddWordActive && (
          <div className="content-add">
            <div
              className="content-add-background"
              onClick={() => setIsAddWordActive(!isAddWordActive)}
            ></div>
            <AddWord
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
              setIsAddWordActive={setIsAddWordActive}
            />
          </div>
        )}
        {isEditWordActive && (
          <div className="content-add">
            <div
              className="content-add-background"
              onClick={() => setIsEditWordActive(!isEditWordActive)}
            ></div>
            <EditWord
              setIsEditWordActive={setIsEditWordActive}
              wordId={wordId}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Mywords;
