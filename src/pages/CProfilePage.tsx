"use client"; // Enable client-side rendering
import { RxAvatar } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab, Spinner } from "@nextui-org/react"; // NextUI Tabs and Tab components
import Image from "next/image";
import { useUser } from "../Context/user.context";
import {
  useGetMyAllPostsData,
  useGetUserProfileData,
} from "../hooks/userProfile.hook";
import Post from "../Componets/ui/NewsFeed/Posts";
import { TPost } from "../Types/Posts/post.type";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";

// Import icons from react-icons
import { FiImage, FiMusic, FiVideo } from "react-icons/fi"; // Feather Icons
import toast from "react-hot-toast";
import Loading from "../Componets/ui/Loading/Loading";
import infiniteScrollFn from "../utils/infiniteScrollFn";

const CProfilePage = ({ params }: { params: any }) => {
  const { user: loggedInUser } = useUser();
  const [allPostData, setAllPostData] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const {
    data: userProfileData,
    isPending: isUserProfileDataLoading,
    isError: isUserProfileDataError,
  } = useGetUserProfileData();
  const {
    data: myAllPostData,
    isPending: isMyAllPostDataLoading,
    isError: isMyAllPostDataError,
    isSuccess,
  } = useGetMyAllPostsData(page, pageSize);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isMyAllPostDataError) {
      toast.error("My all post data some thing went wrong");
    }
    if (isUserProfileDataError) {
      toast.error("My all post data some thing went wrong");
    }
  }, [isMyAllPostDataError, isUserProfileDataError]);
  // Toggle modal visibility
  const toggleEditModal = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (myAllPostData?.result) {
      if (page > 1) {
        setAllPostData((prevData) => [...prevData, ...myAllPostData?.result]);
      } else {
        setAllPostData([...myAllPostData?.result]);
      }
    }
  }, [myAllPostData, page]);

  infiniteScrollFn(page, setPage, myAllPostData?.meta?.total, pageSize);

  return (
    <div className="min-h-screen container mx-auto">
      {/* Cover Section */}
      <div className="relative w-full h-64 bg-gray-300">
        <Image
          src={userProfileData?.coverPhoto as string} // Replace with your cover photo path
          layout="fill"
          objectFit="cover"
          alt="Cover Photo"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          {/* Profile Picture */}
          <div className="relative h-36 w-36 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={userProfileData?.profilePhoto as string} // Replace with your profile picture path
              layout="fill"
              objectFit="cover"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">{loggedInUser?.name}</h1>
        <p className="text-gray-500 text-sm w-[60%] mx-auto my-3 text-center">
          {userProfileData?.bio?.length ? userProfileData?.bio : "Added Bio"}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-center gap-2">
          <Button color="primary" onClick={toggleEditModal}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Navigation Tabs with Icons */}
      <div className="border-b mt-8">
        <div className="container mx-auto px-4">
          <Tabs aria-label="Profile Tabs" color="primary" variant="bordered">
            <Tab
              key="posts"
              title={
                <div className="flex items-center space-x-2">
                  <FiImage /> {/* Image icon */}
                  <span>Posts</span>
                </div>
              }
            >
              {/* Posts Section */}
              <>
                <div className="space-y-4 mt-4">
                  {allPostData?.length
                    ? allPostData?.map((item: TPost) => (
                        <Post key={item._id} post={item} />
                      ))
                    : !isMyAllPostDataLoading && <NoFoundData />}
                </div>

                {isMyAllPostDataLoading && !isSuccess && (
                  <div className="w-full flex justify-center items-center my-10">
                    <Spinner
                      label="Loading..."
                      color="success"
                      labelColor="success"
                    />
                  </div>
                )}
              </>
            </Tab>
            <Tab
              key="Followers"
              title={
                <div className="flex items-center space-x-2">
                  <RxAvatar />
                  {/* Music icon */}
                  <span>Followers</span>
                </div>
              }
            >
              {/* Music Content (You can replace this with actual content) */}
              <div className="text-center py-10">No Followers Available</div>
            </Tab>
            <Tab
              key="videos"
              title={
                <div className="flex items-center space-x-2">
                  <FiVideo /> {/* Video icon */}
                  <span>Videos</span>
                </div>
              }
            >
              {/* Videos Content (You can replace this with actual content) */}
              <div className="text-center py-10">No Videos Available</div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CProfilePage;
