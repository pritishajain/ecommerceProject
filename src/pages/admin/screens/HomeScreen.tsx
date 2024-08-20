import React, { useState } from "react";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import { Outlet } from "react-router";

const HomeScreen = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${isSidebarCollapsed? "w-[80px]" : "w-1/5"} `}>
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <div className="flex-grow">
        <Header isSidebarCollapsed={isSidebarCollapsed} />
        <Outlet/>
      </div>
      
    </div>
  );
};

export default HomeScreen;
