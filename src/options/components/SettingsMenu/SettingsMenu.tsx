import React from "react";
import styles from "./SettingsMenu.module.scss";
export default function SettingsMenu() {
  return (
    <>
      <div className={styles.menu}>
        <div className={`${styles.menuItem} ${styles.active}`}>General</div>
        <div className={styles.menuItem}>List</div>
        <div className={styles.menuItem}>Lorem, ipsum.</div>
        <div className={styles.menuItem}>Lorem, ipsum.</div>
        <div className={styles.menuItem}>Lorem, ipsum.</div>
      </div>
    </>
  );
}
