"use client";
import React, { useState } from "react";
import PostFilterSidebar from "../Componets/ui/Filter/PostFilterSidebar";
import CustomDrawer from "../Componets/ui/Custom Drawer/CustomDrawer";
import { FaFilter } from "react-icons/fa";
const CPostFilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <CustomDrawer isOpen={isOpen} onClose={toggleDrawer}>
        <PostFilterSidebar />
      </CustomDrawer>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-base text-white rounded-md block md:hidden "
      >
        <span className="flex justify-center items-center gap-4">
          {" "}
          Filter <FaFilter />
        </span>
      </button>

      <div className=" hidden md:block">
        <PostFilterSidebar />
      </div>
    </>
  );
};

export default CPostFilterSidebar;
