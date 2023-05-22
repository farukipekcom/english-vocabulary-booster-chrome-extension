import React from "react";
import PageTitle from "../components/PageTitle/PageTitle";
import SettingsMenu from "../components/SettingsMenu/SettingsMenu";
import SettingsList from "../components/SettingsList/SettingsList";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
function Settings() {
  const {token} = useSelector((state: any) => state.word);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <main className="content">
      <PageTitle title="Settings" description="Manage your preferences here." />
      <SettingsMenu />
      <SettingsList />
    </main>
  );
}
export default Settings;
