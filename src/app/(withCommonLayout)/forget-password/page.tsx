import CForgetPasswordPage from "@/src/pages/CForgetPasswordPage";
import React from "react";

const ForgetPasswordPage = ({searchParams}:{searchParams:any}) => {
  return (
    <div className="container mx-auto p-2">
      <CForgetPasswordPage searchParams={searchParams} />
    </div>
  );
};

export default ForgetPasswordPage;
