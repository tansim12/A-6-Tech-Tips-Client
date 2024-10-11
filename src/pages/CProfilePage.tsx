"use client"; // Enable client-side rendering
import { RxAvatar } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab, Spinner, useDisclosure } from "@nextui-org/react"; // NextUI Tabs and Tab components
import Image from "next/image";
import { useUser } from "../Context/user.context";
import {
  useGetMyAllPostsData,
  useGetUserProfileData,
} from "../hooks/userProfile.hook";
import Post from "../Componets/ui/NewsFeed/Posts";
import { TPost } from "../Types/Posts/post.type";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";
import { MdEditSquare } from "react-icons/md";

// Import icons from react-icons
import { FiImage, FiMusic, FiVideo } from "react-icons/fi"; // Feather Icons
import toast from "react-hot-toast";
import infiniteScrollFn from "../utils/infiniteScrollFn";
import CustomModal from "../Componets/ui/Custom Modal/CustomModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "../Componets/Form/FXForm";
import CustomFileUpload from "../Componets/Form/CustomFileUpload";
import CustomButton from "../Componets/ui/Button/CustomButton";

const CProfilePage = ({ params }: { params: any }) => {
  const { user: loggedInUser } = useUser();
  const [allPostData, setAllPostData] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const [selectImage, setSelectImages] = useState([]);
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

  const handleCoverPic: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  infiniteScrollFn(page, setPage, myAllPostData?.meta?.total, pageSize);

  return (
    <>
      <CustomModal
        title="Cover Pic"
        isOpen={isOpen}
        backdrop={backdrop as "opaque" | "blur" | "transparent"}
        onCancel={onClose}
        cancelText="Cancel"
        size="4xl"
      >
        {" "}
        <FXForm onSubmit={handleCoverPic}>
          <CustomFileUpload
            name="coverImage"
            changeOnValue={setSelectImages}
            label="Cover Image"
          />
          <CustomButton name="Submit" />
        </FXForm>
      </CustomModal>

      <div className="min-h-screen container mx-auto">
        {/* Cover Section */}
        <div className="relative w-full h-[40vh] bg-gray-300">
          {/* Cover Photo Section */}
          <div className="relative w-full h-full">
            <Image
              src={userProfileData?.coverPhoto as string} // Replace with your cover photo path
              layout="fill"
              objectFit="cover"
              alt="Cover Photo"
            />
            {/* Edit button for Cover Photo */}
            <button
              onClick={onOpen}
              className="absolute top-4 right-4 bg-base  p-2 rounded-full shadow-lg  z-50"
            >
              <MdEditSquare color="black" size={30} />
            </button>
          </div>

          {/* Profile Picture Section */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative h-36 w-36 rounded-full border-4 border-white overflow-hidden">
              <Image
                src={userProfileData?.profilePhoto as string} // Replace with your profile picture path
                layout="fill"
                objectFit="cover"
                alt="Profile Picture"
              />
              {/* Edit button for Profile Picture */}
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
                <MdEditSquare size={20} />
              </button>
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
    </>
  );
};

export default CProfilePage;
