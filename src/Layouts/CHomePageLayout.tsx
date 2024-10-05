import React, { ReactNode } from "react";

const CHomePageLayout = ({ children }: { children: ReactNode }) => {
  return  <div>
    <p className="text-white font-extrabold text-4xl" >  home sidebar</p>
      {children}
    </div>;
};

export default CHomePageLayout;
