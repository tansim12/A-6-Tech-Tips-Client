"use client";
import { Avatar } from "@nextui-org/avatar";

import Link from "next/link";
import { Button } from "@nextui-org/button";

import ImageGallery from "./ImageGallery";

import { TPost } from "@/src/Types/Posts/post.type";
import { TUser } from "@/src/Types/User/user.types";
import { useUser } from "@/src/Context/user.context";

interface IProps {
  post: TPost;
}

export default function Post({ post }: IProps) {
  const { description, _id, images, userId } = post || {};

  const { name, email, profilePhoto } = (userId as TUser) || {};

  const { user: loggedInUser } = useUser();

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            <Avatar isBordered name={name} radius="sm" src={profilePhoto} />
            <div>
              <p>{name}</p>
              <p className="text-xs">{email}</p>
            </div>
          </div>
        </div>
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="cursor-pointer text-2xl">title</h1>
              </Link>
              <p className="flex items-center gap-1 text-xs">
                Found on: 10/20/25
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1">location city</p>
            </div>
          </div>
          <p>{description}</p>
        </div>

        {images?.length && images.length > 1 && <ImageGallery images={images as string[]} />}


        <div className="mt-4 flex gap-5">
          <Button className="flex-1" variant="light">
            Share
          </Button>
          <Button className="flex-1" variant="light">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
