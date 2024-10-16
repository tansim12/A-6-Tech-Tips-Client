import React from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomToggle from "../../Form/CustomToggle";
import CustomSelect from "../../Form/CustomSelect";
import CustomButton from "../Button/CustomButton";

const UserUpdateInfoForm = ({
  defaultValue,
  userId,
}: {
  defaultValue: any;
  userId: string;
}) => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <FXForm onSubmit={onSubmit} defaultValues={defaultValue}>
        <div className="flex justify-between items-center gap-3">
          <div className="basis-1/2">
            <CustomInput name="name" label="Name" type="string" />
          </div>
          <div className="basis-1/2">
            <CustomSelect
              options={[
                { label: "user", value: "user" },
                { label: "admin", value: "admin" },
              ]}
              defaultValue={[defaultValue?.role]}
              placeholder="Select Role"
              label="User Role"
              name="role"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-5 my-5">
          <div>
            <CustomToggle label="User Delete" name="isDelete" />
          </div>
          <div>
            <CustomToggle label="User Verify" name="isVerified" />
          </div>
          <div>
            <div className="basis-1/2">
              <CustomSelect
                options={[
                  { label: "active", value: "active" },
                  { label: "block", value: "block" },
                ]}
                defaultValue={[defaultValue?.status]}
                placeholder="Select Status"
                label="User Status"
                name="status"
              />
            </div>
          </div>
        </div>

        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default UserUpdateInfoForm;
