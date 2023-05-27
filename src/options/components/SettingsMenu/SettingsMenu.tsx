import React from "react";
import styles from "./SettingsMenu.module.scss";
export default function SettingsMenu() {
  return (
    <>
      <div className={styles.menu}>
        <a href="#/settings/profile" className={`${styles.menuItem} ${styles.active}`}>
          Profile
        </a>
        <a href="#/settings/list" className={styles.menuItem}>
          List
        </a>
      </div>
    </>
  );
}
