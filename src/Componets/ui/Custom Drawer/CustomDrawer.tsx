import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
const CustomDrawer = ({
  isOpen,
  onClose,
  children,
}: {
  onClose: any;
  isOpen: any;
  children: ReactNode;
}) => {
  return (
    <div
      className={`fixed inset-0  bg-gray-800 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 999 }} // Increase z-index of the overlay
    >
      <div
        className={`fixed rounded-lg left-0 top-20 h-full w-64 bg-black shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 999 }} // Increase z-index of the drawer itself
      >
        <button
          onClick={onClose}
          className="p-4 font-extrabold flex w-full justify-end text-white "
        >
          <IoMdClose size={40} />
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomDrawer;
