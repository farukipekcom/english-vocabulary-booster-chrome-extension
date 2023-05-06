import React from "react";
import "./Header.scss";
import Logo from "../icons/logo";
import DashboardICon from "../icons/dashboard";
import MyWordIcon from "../icons/myword";
import SettingsIcon from "../icons/settings";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import Settings from "../../pages/settings";
import Mywords from "../../pages/mywords";
function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-menu">
        <a href="#/" className="header-menu-item">
          <div className="header-menu-item-icon">
            <DashboardICon />
          </div>
          <div className="header-menu-item-text">Dashboard</div>
        </a>
        <a href="#/mywords" className="header-menu-item">
          <div className="header-menu-item-icon">
            <MyWordIcon />
          </div>
          <div className="header-menu-item-text">My Words</div>
        </a>
        <a href="#/settings" className="header-menu-item">
          <div className="header-menu-item-icon">
            <SettingsIcon />
          </div>
          <div className="header-menu-item-text">Settings</div>
        </a>
      </div>
      <div className="header-total">
        <div className="header-total-heading">Total Words</div>
        <div className="header-total-count">274</div>
      </div>
    </header>
  );
}

export default Header;
