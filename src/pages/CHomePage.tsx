
import React from "react";
import CreatePost from "../Componets/ui/Posts/CreatePost";
import ShowRecentPost from "../Componets/ui/Posts/ShowRecentPost";

const CHomePage = async () => {

  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <div>
        <ShowRecentPost />
      </div>
    </div>
  );
};

export default CHomePage;
