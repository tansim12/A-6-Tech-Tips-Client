import React, { ReactNode } from "react";

const HomeLayout = ({
  children,
  filter,
}: {
  children: ReactNode;
  filter: ReactNode;
}) => {
  return (
    <>
      <div className="container mx-auto p-3">
        <div className="flex gap-5">
          <div className="sticky max-h-screen " id="stickySidebar">
            <div className="basis-1/5 sticky ">{filter}</div>
          </div>
          <div className="basis-4/5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
