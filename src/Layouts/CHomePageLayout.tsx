import React, { ReactNode } from "react";

const CHomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto p-3">
      <div className="flex items-center gap-10  ">
        <p className=" dark:text-darkText font-extrabold text-4xl">
          {" "}
          left sidebar
        </p>
        <div className="basis-4/5">{children}</div>
      </div>
    </div>
  );
};

export default CHomePageLayout;
