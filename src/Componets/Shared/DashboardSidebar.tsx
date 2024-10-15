"use client";

import { ReactNode, useState } from "react";
import CustomDrawer from "../ui/Custom Drawer/CustomDrawer";

import { FaFilter } from "react-icons/fa";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/src/Constant/dashboardSidebar.const";
import { useUser } from "@/src/Context/user.context";
import DashboardMenuItems from "./DashboardMenuItems";

const DashboardSidebar = () => {
  const { user } = useUser();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <CustomDrawer isOpen={isOpen} onClose={toggleDrawer}>
        <DashboardMenuItems role={user?.role} />
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

      <div className="hidden md:block">
        <DashboardMenuItems role={user?.role} />
      </div>
    </div>
  );
};

export default DashboardSidebar;
