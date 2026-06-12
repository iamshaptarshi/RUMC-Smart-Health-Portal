import React from "react";
import { Outlet } from "react-router";
import LabSidebar from "./LabSidebar";

const LabDashboard = () => {
  return (
    <div className="flex min-h-screen max-w-[1440px] mx-auto bg-[#ecebfa]">
      <LabSidebar />

      <div className="ml-[250px] flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default LabDashboard;