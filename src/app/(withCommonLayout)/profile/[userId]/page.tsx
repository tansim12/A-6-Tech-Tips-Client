import CProfilePage from "@/src/AllComponetsPages/CProfilePage";
import React from "react";

const ProfilePge = ({ params }: { params: any }) => {
  return (
    <div>
      <CProfilePage params={params} />
    </div>
  );
};

export default ProfilePge;
