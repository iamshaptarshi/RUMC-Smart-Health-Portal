import React from "react";
import NavStart from "./NavStart";
import NavCenter from "./NavCenter";

import NavEnd from "./NavEnd";

const Navbar = () => {
  return (
    <div className="bg-primary shadow-sm">
      <div className="navbar not-sm:-ml-3  text-white lg:max-w-[1200px] xl:max-w-340 mx-auto">
        <NavStart />
        <NavCenter />
        <NavEnd/>
        
      </div>
    </div>
  );
};

export default Navbar;
