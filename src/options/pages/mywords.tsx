import React from "react";

function Mywords() {
  return (
    <div className="main">
      <header className="header">
        <div className="header-logo">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="header-menu">
          <div className="header-menu-item">
            <div className="header-menu-item-icon">
              <img src="/dashboard.svg" alt="" />
            </div>
            <div className="header-menu-item-text">Dashboard</div>
          </div>
          <div className="header-menu-item">
            <div className="header-menu-item-icon">
              <img src="/mywords.svg" alt="" />
            </div>
            <div className="header-menu-item-text">My Words</div>
          </div>
          <div className="header-menu-item">
            <div className="header-menu-item-icon">
              <img src="/settings.svg" alt="" />
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
            <div className="content-heading-right-button">
              <div className="content-heading-right-button-icon">
                <img src="/plus.svg" alt="" />
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
              <img src="/search.svg" alt="" />
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
          <div className="content-table-row">
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column content-table-row-column-buttons">
              <div className="content-table-row-column-buttons-delete">
                <img src="/delete.svg" alt="" />
              </div>
              <div className="content-table-row-column-buttons-edit">
                <img src="/edit.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="content-table-row">
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column content-table-row-column-buttons">
              <div className="content-table-row-column-buttons-delete">
                <img src="/delete.svg" alt="" />
              </div>
              <div className="content-table-row-column-buttons-edit">
                <img src="/edit.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Mywords;
