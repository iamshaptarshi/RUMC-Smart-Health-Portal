import React from "react";
import ruLogo from "../../assets/ruLogo.png";
import ThemeToggle from "../../Theme/Theme Toggle";
import { Link, NavLink } from "react-router";
import { FaHome, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { PiSirenFill } from "react-icons/pi";

const NavStart = () => {
  return (
    <div className="navbar-start min-w-50">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
          <li>
            <NavLink to="/">
              {" "}
              <FaHome className="text-lg" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="about">
              {" "}
              <FaInfoCircle className="text-lg" /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="emergency">
              {" "}
              <PiSirenFill className="text-lg" /> Emergency Services
            </NavLink>
          </li>

          <li>
            <NavLink to="contact">
              {" "}
              <FaPhoneAlt className="text-lg" /> Contact
            </NavLink>
          </li>

          <li className="sm:hidden">
            <ThemeToggle />
          </li>
        </ul>
      </div>
      <Link to="/" className="flex gap-3 ">
        <div>
          <img className="w-11 sm:w-14" src={ruLogo} alt="" />
        </div>
        <div className="flex flex-col my-auto">
          <p className="font-semibold font-cabin text-[24px] sm:text-[28.5px] -mb-1">RUMC</p>
          <p className="text-[9px] sm:text-[11px]">Smart Health Portal</p>
        </div>
      </Link>
    </div>
  );
};

export default NavStart;
