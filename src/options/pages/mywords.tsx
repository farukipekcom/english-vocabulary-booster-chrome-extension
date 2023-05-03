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
            <div className="content-heading-title"></div>
            <div className="content-heading-subtitle"></div>
          </div>
          <div className="content-heading-right">
            <div className="content-heading-button">
              <div className="content-heading-button-icon"></div>
              <div className="content-heading-button-text">Add</div>
            </div>
          </div>
        </div>
        <div className="content-filter">
          <div className="content-filter-categories">
            <div className="content-filter-categories-item">View All</div>
            <div className="content-filter-categories-item">Verb</div>
            <div className="content-filter-categories-item">Noun</div>
            <div className="content-filter-categories-item">Adjective</div>
            <div className="content-filter-categories-item">adverb</div>
          </div>
          <div className="content-filter-search">
            <div className="content-filter-icon"></div>
            <input type="text" name="search" placeholder="Search" />
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
          </div>
          <div className="content-table-row">
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column">apple</div>
            <div className="content-table-row-column content-table-row-column-buttons">
              <div className="content-table-row-column-buttons-delete"></div>
              <div className="content-table-row-column-buttons-edit"></div>
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
              <div className="content-table-row-column-buttons-delete"></div>
              <div className="content-table-row-column-buttons-edit"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Mywords;
