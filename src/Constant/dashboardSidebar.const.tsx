import { FaHome } from "react-icons/fa";

import { ReactNode } from "react"; // Import ReactNode for JSX types
import { FiHome, FiSettings, FiUsers } from "react-icons/fi";

// Define the type for the sidebar items
interface SidebarItem {
  name: string;
  path: string;
  icon?: ReactNode; // Allow icon as ReactNode (JSX element)
  children?: SidebarItem[]; // Optional children property for nested links
}

export const sidebarItems: { admin: SidebarItem[]; user: SidebarItem[] } = {
  admin: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },
  ],
  user: [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <FiHome />,
    },
    {
      name: "Payments",
      path: "/user/payment-history",
      icon: <FiUsers />,
    },
  ],
};

//* children example
// admin: [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <FaHome />,
//     children: [
//       { name: "Overview", path: "/admin/overview" },
//       { name: "Reports", path: "/admin/reports" },
//     ],
//   },
//   {
//     name: "Users",
//     path: "/admin/users",
//     icon: <FiUsers />,
//     children: [
//       { name: "Manage Users", path: "/admin/users/manage" },
//       { name: "Add New User", path: "/admin/users/add" },
//     ],
//   },
// ],
