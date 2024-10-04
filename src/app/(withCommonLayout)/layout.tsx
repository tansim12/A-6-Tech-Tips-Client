import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return <div>nav{children}</div>;
};

export default CommonLayout;
