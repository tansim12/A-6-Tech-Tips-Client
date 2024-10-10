import CProfilePage from "@/src/pages/CProfilePage";
import React from "react";

const ProfilePge = ({params}:{params:any}) => {
  return (
    <div>
      <CProfilePage params={params } />
    </div>
  );
};

export default ProfilePge;
