import React, {useEffect, useState} from "react";
import "./Header.scss";
import Logo from "../icons/logo";
import DashboardICon from "../icons/dashboard";
import MyWordIcon from "../icons/myword";
import SettingsIcon from "../icons/settings";
function Header() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    const getData = async () => {
      await fetch(process.env.API_URL)
        .then((res) => res.json())
        .then((data) => {
          setData(data.length);
          setLoading(true);
        });
    };
    getData();
  }, []);
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
        <div className="header-total-count">{loading && data}</div>
      </div>
    </header>
  );
}

export default Header;
