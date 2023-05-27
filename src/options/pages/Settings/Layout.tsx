import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import SettingsMenu from "../../components/SettingsMenu/SettingsMenu";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main className="content">
      <PageTitle title="Settings" description="Manage your preferences here." />
      <SettingsMenu />
      <Outlet />
    </main>
  );
}
