import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import ReactToaster from "../../React Toast/ReactToaster";

const Root = () => {
  return (
    <div className=" mx-auto  min-h-[100vh] bg-gradient-to-br from-[#f5f3ff] via-white to-[#ede9fe]">
      <Navbar />
      <div className="max-w-[1400px] mx-auto">
        <ReactToaster/>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
