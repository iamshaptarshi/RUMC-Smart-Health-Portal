import React from "react";
import DoctorDashboard from "../../Pages/Dashboard/Doctor/DoctorDashboard";
import DashSidebar from "./DashSidebar";
import { Outlet } from "react-router";
import ReactToaster from "../../React Toast/ReactToaster";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen max-w-[1440px] mx-auto bg-[#ecebfa]">
      <DashSidebar />
      <ReactToaster />
      <div className="ml-[250px] flex-1 w-full  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
