import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      dashboardNav
      {children}
    </div>
  );
};

export default DashboardLayout;
