import React from "react";
import SidebarWithHeader from "../Sidebar/SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <SidebarWithHeader>{children}</SidebarWithHeader>
    </div>
  );
};

export default Layout;
