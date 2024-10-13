"use client";
import React, { useEffect } from "react";
import FXForm from "../Componets/Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../Componets/Form/CustomInput";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordValidationSchemaZod } from "../Schemas/auth.schema";
import CustomButton from "../Componets/ui/Button/CustomButton";
import { useChangePassword } from "../hooks/auth.hooks";
import Loading from "../Componets/ui/Loading/Loading";
import { useRouter } from "next/navigation";

const CForgetPasswordPage = ({ searchParams }: { searchParams: any }) => {
  const {
    isPending,
    mutate: handleChangePassword,
    isSuccess,
  } = useChangePassword();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data?.newPassword !== data?.confirmNewPassword) {
      return toast.error("New Password and Confirm New Password Not Matched");
    }
    const newPayload = {
      token: searchParams?.token,
      payload: {
        email: data?.email,
        newPassword: data?.newPassword,
      },
    };
    handleChangePassword(newPayload);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="h-screen w-full flex justify-center items-center ">
        <div className="border border-base p-5 md:p-16 rounded-xl w-[60%]">
          <div className="text-center text-lg md:text-2xl font-bold my-4">
            Forget Password
          </div>
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(changePasswordValidationSchemaZod)}
          >
            <div>
              <CustomInput label="Email" name="email" type="email" />
            </div>
            <div>
              <CustomInput
                label="New Password"
                name="newPassword"
                type="password"
              />
            </div>
            <div>
              <CustomInput
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
              />
            </div>
            <div className="my-3">
              <CustomButton name="Submit" />
            </div>
          </FXForm>
        </div>
      </div>
    </>
  );
};

export default CForgetPasswordPage;
