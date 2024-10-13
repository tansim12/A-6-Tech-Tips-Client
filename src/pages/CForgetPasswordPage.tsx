"use client";
import React from "react";
import FXForm from "../Componets/Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../Componets/Form/CustomInput";

const CForgetPasswordPage = ({searchParams}:{searchParams:any}) => {
    console.log(searchParams);
    
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
  };
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="border border-base p-5 md:p-16 rounded-xl w-[60%]">
        <div className="text-center text-lg md:text-2xl font-bold my-4">
          Forget Password
        </div>
        <FXForm onSubmit={onSubmit}>
          <div>
            <CustomInput label="Email" name="email" type="email" />
          </div>
          <div>
            <CustomInput label="New Password" name="newPassword" type="password" />
          </div>
          <div>
            <CustomInput label="Confirm New Password" name="confirmNewPassword" type="password" />
          </div>
        </FXForm>
      </div>
    </div>
  );
};

export default CForgetPasswordPage;
