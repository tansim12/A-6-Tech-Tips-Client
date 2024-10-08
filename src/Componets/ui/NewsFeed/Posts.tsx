"use client";
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
import { useRouter } from "next/navigation";

interface IProps {
  post: TPost;
}

export default function Post({ post }: IProps) {
  const router = useRouter();
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

              <p className="flex items-center gap-1 text-[10px]">
                {dayDifference > 2
                  ? moment(createdAt).format("LL")
                  : moment(createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              {!loggedInUser?._id ? (
                <Link
                  href={`/login`}
                  // onClick={() => !loggedInUser?._id && router.push("/login")}
                  className="text-3xl"
                >
                  <span className="cursor-pointer text-2xl text-primary">
                    {title}
                  </span>
                </Link>
              ) : loggedInUser?.isVerified === false ? (
                <Link href={`/all-package`} className="text-3xl">
                  <span className="cursor-pointer text-2xl text-primary">
                    {title}
                  </span>
                </Link>
              ) : (
                <Link href={`/post/${_id}`} className="text-3xl">
                  <span className="cursor-pointer text-2xl text-primary">
                    {title}
                  </span>
                </Link>
              )}
              <div></div>
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

          <div>
            {description?.length > 100 && (
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${description?.slice(0, 100)} .....`,
                  }}
                ></div>

                {!loggedInUser?._id ? (
                  <Link href={`/login`} className="text-3xl">
                    <span className="cursor-pointer font-bold text-lg dark:text-white light:to-black hover:text-primary">
                      See More
                    </span>
                  </Link>
                ) : loggedInUser?.isVerified === false ? (
                  <Link href={`/all-package`} className="text-3xl">
                    <span className="cursor-pointer font-bold text-lg dark:text-white light:to-black hover:text-primary">
                      See More
                    </span>
                  </Link>
                ) : (
                  <Link href={`/post/${_id}`} className="text-3xl">
                    <span className="cursor-pointer font-bold text-lg dark:text-white light:to-black hover:text-primary">
                      See More
                    </span>
                  </Link>
                )}
              </div>
            )}

            {description?.length < 100 && (
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
            )}
          </div>
        </div>

        {images?.length && images.length > 0 ? (
          <ImageGallery images={images as string[]} />
        ) : (
          ""
        )}

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
