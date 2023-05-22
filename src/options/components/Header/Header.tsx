import React from "react";
import styles from "./Header.module.scss";
import {LogoIcon, DashboardIcon, MyWordIcon, SettingsIcon, LogoutIcon} from "../icons/index";
import {useDispatch, useSelector} from "react-redux";
import {supabase} from "../../lib/helper/supabaseClient";
import {setToken} from "../../../stores/word";
import {useNavigate} from "react-router-dom";
function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {allWordsLoading, allWordsCount} = useSelector((state: any) => state.word);
  const {token} = useSelector((state: any) => state.word);
  const {userLoading, userResponse} = useSelector((state: any) => state.word);
  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    dispatch(setToken(false));
    localStorage.removeItem("token");
    navigate("../login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <LogoIcon />
      </div>
      <div className={styles.headerMenu}>
        <a href="#/home" className={styles.headerMenuItem}>
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
      <div className={styles.footer}>
        <div className={styles.profile}>
          <img src="./icon128.png" className={styles.image}></img>
          <div className={styles.info}>
            <div className={styles.name}>{!userLoading && userResponse?.name}</div>
            <div className={styles.email}>{token?.user?.email}</div>
          </div>
          <div className={styles.logout} onClick={logout}>
            <LogoutIcon />
          </div>
        </div>
        <div className={styles.headerTotal}>
          <div className={styles.headerTotalHeading}>Total Words</div>
          <div className={styles.headerTotalCount}>{!allWordsLoading && allWordsCount}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
