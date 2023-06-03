import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import SettingsMenu from "../../components/SettingsMenu/SettingsMenu";
import {Outlet} from "react-router-dom";
import {MyToaster} from "../../lib/toast";

export default function Layout() {
  return (
    <main className="content">
      <PageTitle title="Settings" description="Manage your preferences here." />
      <SettingsMenu />
      <Outlet />
      <MyToaster />
    </main>
  );
}
