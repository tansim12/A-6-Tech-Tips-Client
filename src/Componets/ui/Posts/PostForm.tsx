"use client";
import React, { useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomSelect from "../../Form/CustomSelect";
import { categoryDataByLabel } from "@/src/Constant/filter.const";
import CustomToggle from "../../Form/CustomToggle";
import { Button } from "@nextui-org/react";
import { TUser } from "@/src/Types/User/user.types";
import CustomFileUpload from "../../Form/CustomFileUpload";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "@/src/Schemas/createPost.schema";

const PostForm = ({ user }: { user: TUser }) => {
  const [selectImages, setSelectImages] = useState([]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadImagesToImgBB(selectImages);

    const payload = {
      title: data?.title,
      description: data?.description,
      premium: data?.premium,
      images,
      category: data?.category,
    };
    console.log(payload);
    
  };
  return (
    <div>
      <FXForm onSubmit={onSubmit} resolver={zodResolver(createPostSchema)}>
        <CustomInput name="title" label="Title" type="text" />

        <div className=" flex gap-10 w-full items-center my-3">
          <div className="basis-3/5">
            <CustomSelect
              label="Category"
              name="category"
              options={categoryDataByLabel}
              placeholder="Select Category"
            />
          </div>
          <div className="basis-2/5">
            <CustomToggle label="Premium" name="premium" />
          </div>
        </div>

        <CustomFileUpload
          changeOnValue={setSelectImages}
          name="images"
          label="Images"
        />
        <div className="mb-16">
          <CustomReactQuill name="description" label="Description" />
        </div>

        <Button type="submit">Submit</Button>
      </FXForm>
    </div>
  );
};

export default PostForm;
