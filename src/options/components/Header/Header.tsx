import React from "react";
import styles from "./Header.module.scss";
import {LogoIcon, DashboardIcon, MyWordIcon, SettingsIcon} from "../icons/index";
import {useSelector} from "react-redux";
function Header() {
  const {allWordsLoading, allWordsCount} = useSelector((state: any) => state.word);
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <LogoIcon />
      </div>
      <div className={styles.headerMenu}>
        <a href="#/" className={styles.headerMenuItem}>
          <div className={styles.headerMenuItemIcon}>
            <DashboardIcon />
          </div>
          <div className={styles.headerMenuItemText}>Dashboard</div>
        </a>
        <a href="#/mywords" className={styles.headerMenuItem}>
          <div className={styles.headerMenuItemIcon}>
            <MyWordIcon />
          </div>
          <div className={styles.headerMenuItemText}>My Words</div>
        </a>
        <a href="#/settings" className={styles.headerMenuItem}>
          <div className={styles.headerMenuItemIcon}>
            <SettingsIcon />
          </div>
          <div className={styles.headerMenuItemText}>Settings</div>
        </a>
      </div>
      <div className={styles.headerTotal}>
        <div className={styles.headerTotalHeading}>Total Words</div>
        <div className={styles.headerTotalCount}>{!allWordsLoading && allWordsCount}</div>
      </div>
    </header>
  );
}

export default Header;
