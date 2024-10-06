import React, { ReactNode } from "react";

const CHomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto p-3">
      <div className=" md:flex lg:flex gap-10  ">
        <p className=" dark:text-darkText font-extrabold text-4xl hidden md:block">
          {" "}
          left sidebar
        </p>
        <div className="basis-4/5">{children}</div>
      </div>
    </div>
  );
};

export default CHomePageLayout;
