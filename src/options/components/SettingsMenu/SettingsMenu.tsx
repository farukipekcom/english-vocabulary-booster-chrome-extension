import React from "react";
import styles from "./SettingsMenu.module.scss";
import {useLocation} from "react-router-dom";
export default function SettingsMenu() {
  let location = useLocation();
  const menu = ["Profile", "List"];
  const path = location.pathname.split("/")[2];
  return (
    <>
      <div className={styles.menu}>
        {menu.map((item) => (
          <a
            key={item}
            href={`#/settings/${item.replace(" ", "-").toLocaleLowerCase()}`}
            className={`${styles.menuItem} ${item.replace(" ", "-").toLocaleLowerCase() === path && styles.active}`}>
            {item}
          </a>
        ))}
      </div>
    </>
  );
}
