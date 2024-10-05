import React, { ReactNode } from "react";

const CHomePageLayout = ({ children }: { children: ReactNode }) => {
  return  <div>
    <p className=" dark:text-darkText font-extrabold text-4xl" >  home sidebar</p>
    <p className="text-base">hello</p>
      {children}
    </div>;
};

export default CHomePageLayout;
