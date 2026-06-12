import React from "react";
import { Link, useLocation } from "react-router";
import { FaFlask, FaList, FaCheckCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import ruLogo from "../../assets/ruLogo.png";
import { useAuth } from "../../Authentication/AuthProvider";

const SidebarItem = ({ icon, text, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${
        active
          ? "bg-white text-[#1e1b3a] font-medium"
          : "text-gray-300 hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

const LabSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[250px] fixed min-h-[100vh] bg-[#1e1b3a] text-white flex flex-col">
      
      {/* LOGO */}
      <div className="bg-[#7B74EA] flex justify-center w-full py-3">
        <Link to="/" className="flex gap-3">
          <img className="w-10" src={ruLogo} />
          <div>
            <p className="font-semibold text-lg">RUMC</p>
            <p className="text-xs">Smart Health Portal</p>
          </div>
        </Link>
      </div>

      {/* MENU */}
      <div className="flex-1 mt-10 space-y-2 px-4 flex flex-col justify-between">
        <div>
          <Link to="/lab-dashboard">
            <SidebarItem
              active={isActive("/lab-dashboard")}
              icon={<FaFlask />}
              text="Dashboard"
            />
          </Link>

          <Link to="/lab-dashboard/pending">
            <SidebarItem
              active={isActive("/lab-dashboard/pending")}
              icon={<FaList />}
              text="Pending Tests"
            />
          </Link>

          <Link to="/lab-dashboard/processing">
            <SidebarItem
              active={isActive("/lab-dashboard/processing")}
              icon={<FaCheckCircle />}
              text="Processing Tests"
            />
          </Link>
        </div>

        <button
          onClick={logout}
          className="btn bg-transparent mb-5 text-red-500 border-2 border-red-600 w-full"
        >
          <TbLogout2 /> Logout
        </button>
      </div>
    </div>
  );
};

export default LabSidebar;