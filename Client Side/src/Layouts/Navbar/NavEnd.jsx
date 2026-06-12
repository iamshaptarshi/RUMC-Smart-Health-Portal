import React from "react";
import ThemeToggle from "../../Theme/Theme Toggle";
import { Link, NavLink } from "react-router";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import NavCenter from "./NavCenter";
import { useAuth } from "../../Authentication/AuthProvider";

const NavEnd = () => {
  const { logout } = useAuth();
  return (
    <div className=" navbar-end dropdown flex gap-5">

      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar">
        <div className="w-14 border-3 border-secondary rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className=" text-[14px] menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-25 w-52 p-2 shadow">
        
        <li>
          <button onClick={logout}>
            <LuLogOut className="text-red-500 text-lg" />{" "}
            <p className="text-red-500">Logout</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavEnd;
