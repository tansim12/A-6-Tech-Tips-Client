import React, { Suspense } from "react";
import CreatePost from "../Componets/ui/Posts/CreatePost";
import ShowRecentPost from "../Componets/ui/Posts/ShowRecentPost";
import Loading from "../Componets/ui/Loading/Loading";

const CHomePage = async () => {
  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <div>
        {/* todo loading remove and added skeleton here   */}
        <Suspense fallback={<Loading />}>
          <ShowRecentPost />
        </Suspense>
      </div>
    </div>
  );
};

export default CHomePage;
