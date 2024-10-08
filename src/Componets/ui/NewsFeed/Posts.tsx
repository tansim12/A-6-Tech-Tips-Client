"use client";
import { Avatar } from "@nextui-org/avatar";
import { FaShare } from "react-icons/fa6";
import { MdWorkspacePremium } from "react-icons/md";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import ImageGallery from "./ImageGallery";

import { TPost } from "@/src/Types/Posts/post.type";
import { TUser } from "@/src/Types/User/user.types";
import { useUser } from "@/src/Context/user.context";
import moment from "moment";
import Image from "next/image";

interface IProps {
  post: TPost;
}

export default function Post({ post }: IProps) {
  const { description, _id, images, userId, premium, title, createdAt } =
    post || {};

  const { name, email, profilePhoto } = (userId as TUser) || {};
  const { user: loggedInUser } = useUser();
  const dayDifference = Number(moment().diff(moment(createdAt), "days"));
  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src={profilePhoto as string}
              width={50}
              height={50}
              alt="user Image"
              className="rounded-full border-4 border-base "
            />
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
                <h1 className="cursor-pointer text-2xl">{title}</h1>
              </Link>
              <p className="flex items-center gap-1 text-xs">
                {dayDifference > 2
                  ? moment(createdAt).format("LL")
                  : moment(createdAt).fromNow()}
              </p>
            </div>
            <div>
              {premium && (
                <p className="flex items-center gap-1 flex-col ">
                  <MdWorkspacePremium size={40} color="gold" />{" "}
                  <span className="text-sm">Premium</span>
                </p>
              )}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>

        {images?.length && images.length > 0 ? (
          <ImageGallery images={images as string[]} />
        ):""}

        <div className="mt-4 flex gap-5">
          <Button className="flex-1" variant="light">
            Share
          </Button>
          <Button className="flex-1" variant="light">
            Share
            <FaShare />
          </Button>
        </div>
      </div>
    </div>
  );
}
