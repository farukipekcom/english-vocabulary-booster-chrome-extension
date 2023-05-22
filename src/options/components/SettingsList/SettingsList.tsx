import React from "react";
import styles from "./SettingsList.module.scss";
import InputText from "../InputText/InputText";
export default function SettingsList() {
  return (
    <div className={styles.list}>
      <div className={styles.heading}>
        <div className={styles.title}>List</div>
        <div className={styles.description}>Update your list details here.</div>
      </div>
      <div className={styles.item}>
        <div className={styles.settingName}>Table word count</div>
        <div className={styles.setting}>
          <InputText placeholder="Enter a number" type="number" />
        </div>
      </div>
    </div>
  );
}
