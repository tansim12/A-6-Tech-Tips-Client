import React from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomSelect from "../../Form/CustomSelect";
import { categoryDataByLabel } from "@/src/Constant/filter.const";
import CustomToggle from "../../Form/CustomToggle";
import { Button } from "@nextui-org/react";
import { TUser } from "@/src/Types/User/user.types";

const PostForm = ({ user }: { user: TUser }) => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <FXForm onSubmit={onSubmit}>
        <CustomInput name="title" label="Title" type="text" />
        <CustomReactQuill name="description" label="Description" />
        <CustomSelect
          label="Category"
          name="category"
          options={categoryDataByLabel}
        />
        <CustomToggle label="Premium 😶" name="premium" />
        <Button type="submit">Submit</Button>
      </FXForm>
    </div>
  );
};

export default PostForm;
