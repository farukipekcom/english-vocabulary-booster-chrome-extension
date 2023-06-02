import React, {useEffect} from "react";
import styles from "./Header.module.scss";
import {LogoIcon, DashboardIcon, MyWordIcon, SettingsIcon, LogoutIcon} from "../icons/index";
import {useDispatch, useSelector} from "react-redux";
import {supabase} from "../../lib/helper/supabaseClient";
import {fetchUser, setToken} from "../../../stores/word";
import {useNavigate} from "react-router-dom";
function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {userLoading, userResponse, userSuccess, wordsResponse, wordsSuccess} = useSelector((state: any) => state.word);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    dispatch(setToken(null));
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
        <a href="#/mywords" target="_parent" className={styles.headerMenuItem}>
          <div className={styles.headerMenuItemIcon}>
            <MyWordIcon />
          </div>
          <div className={styles.headerMenuItemText}>My Words</div>
        </a>
        <a href="#/settings/profile" className={styles.headerMenuItem}>
          <div className={styles.headerMenuItemIcon}>
            <SettingsIcon />
          </div>
          <div className={styles.headerMenuItemText}>Settings</div>
        </a>
      </div>
      <div className={styles.footer}>
        <div className={styles.profile}>
          {userSuccess === true && userResponse?.image_path ? (
            <img className={styles.image} src={process.env.REACT_APP_SUPABASE_PHOTO_URL + userResponse?.image_path} />
          ) : (
            <div className={styles.imageText}>{userSuccess && userResponse?.name.charAt(0)}</div>
          )}
          <div className={styles.info}>
            <div className={styles.name}>{!userLoading && userResponse?.name}</div>
            <div className={styles.email}>{!userLoading && userResponse?.email_address}</div>
          </div>
          <div className={styles.logout} onClick={logout}>
            <LogoutIcon />
          </div>
        </div>
        <div className={styles.headerTotal}>
          <div className={styles.headerTotalHeading}>Total Words</div>
          <div className={styles.headerTotalCount}>{wordsSuccess && wordsResponse.length}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
