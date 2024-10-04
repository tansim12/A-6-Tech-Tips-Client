import CHomePageLayout from "@/src/Layouts/CHomePageLayout";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <CHomePageLayout>{children}</CHomePageLayout>
    </div>
  );
};

export default HomeLayout;
