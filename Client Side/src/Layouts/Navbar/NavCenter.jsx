import React from 'react';
import ThemeToggle from "../../Theme/Theme Toggle";
import { NavLink } from "react-router";
import { FaHome, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { PiSirenFill } from "react-icons/pi";

const NavCenter = () => {
    return (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[16px]  flex gap-2">
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
            
          </ul>
        </div>
    );
};

export default NavCenter;