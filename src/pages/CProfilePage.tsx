"use client"; // Enable client-side rendering
import { RxAvatar } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab, Spinner, useDisclosure } from "@nextui-org/react"; // NextUI Tabs and Tab components
import Image from "next/image";
import { useUser } from "../Context/user.context";
import {
  useGetMyAllPostsData,
  useGetUserProfileData,
  useUpdateUserProfile,
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
import { useUpdatePost } from "../hooks/post.hook";
import { uploadImagesToImgBB } from "../utils/uploadImagesToImgBB";
import { TUserProfile } from "../Types/User/user.types";
import Loading from "../Componets/ui/Loading/Loading";
import { FaCheckCircle } from "react-icons/fa";

const CProfilePage = ({ params }: { params: any }) => {
  const { user: loggedInUser } = useUser();
  const [allPostData, setAllPostData] = useState<TPost[]>([]);
  const [modalType, setModalType] = useState<
    "coverPhoto" | "profilePhoto" | null
  >(null);
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

  const {
    data: updatePostData,
    mutate: handleUpdatePost,
    isPending: isUpdatePostLoading,
    isError: isUpdatePostError,
    isSuccess: updatePostIsSuccess,
  } = useUpdatePost();
  const {
    data: updateUserData,
    mutate: handleUpdateUserInfoMute,
    isPending: updateUserInfoIsPending,
    isError: updateUserInfoIsError,
    isSuccess: updateUserInfoIsSuccess,
  } = useUpdateUserProfile();

  const [isEditing, setIsEditing] = useState(false);

  // error use effect
  useEffect(() => {
    if (isMyAllPostDataError) {
      toast.error("My all post data some thing went wrong");
    }
    if (isUserProfileDataError) {
      toast.error("My all post data some thing went wrong");
    }
    if (selectImage?.length > 1) {
      toast.error("Please Select One Image");
    }
    if (updateUserInfoIsError) {
      toast.error("User update failed");
    }
  }, [
    isMyAllPostDataError,
    isUserProfileDataError,
    selectImage?.length,
    updateUserInfoIsError,
  ]);
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

  const handleSubmitPhoto: SubmitHandler<FieldValues> = async () => {
    let uploadedImage;

    if (selectImage?.length > 0) {
      uploadedImage = await uploadImagesToImgBB(selectImage); // Assuming this uploads and returns image URLs
    }

    if (modalType === "coverPhoto") {
      const payload = { coverPhoto: uploadedImage?.[0] };
      handleUpdateUserInfoMute(payload as any);
    } else if (modalType === "profilePhoto") {
      const payload = { profilePhoto: uploadedImage?.[0] };
      handleUpdateUserInfoMute(payload as any);
    }

    onClose();
    setSelectImages([]);
  };

  infiniteScrollFn(page, setPage, myAllPostData?.meta?.total, pageSize);

  return (
    <>
      {/* cover photo update  */}
      <CustomModal
        title={modalType as string}
        isOpen={isOpen}
        backdrop={backdrop as "opaque" | "blur" | "transparent"}
        onCancel={onClose}
        cancelText="Cancel"
        size="4xl"
      >
        {" "}
        <>
          {updateUserInfoIsPending && <Loading />}
          <FXForm onSubmit={handleSubmitPhoto}>
            <CustomFileUpload
              name="coverPhoto"
              changeOnValue={setSelectImages}
              label="Cover Image"
            />
            <CustomButton name="Submit" />
          </FXForm>
        </>
      </CustomModal>

      <div className="min-h-screen container mx-auto">
        {/* Cover Section */}
        <div className="relative w-full h-[40vh] bg-gray-300">
          {/* Cover Photo Section */}
          <div className="relative w-full h-full">
            <Image
              src={userProfileData?.coverPhoto as string} // Replace with your cover photo path
              layout="fill"
              className="object-cover"
              alt="Cover Photo"
            />
            {/* Edit button for Cover Photo */}
            <button
              onClick={() => {
                setModalType("coverPhoto");
                onOpen();
              }}
              className="absolute top-4 right-4 bg-base  p-2 rounded-full shadow-lg"
            >
              <MdEditSquare color="black" size={30} />
            </button>
          </div>

          {/* Profile Picture Section */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div
              className="relative h-36 w-36 rounded-full border-4 border-white overflow-hidden"
              style={{ zIndex: 100 }}
            >
              <Image
                src={userProfileData?.profilePhoto as string} // Replace with your profile picture path
                layout="fill"
                objectFit="cover"
                alt="Profile Picture"
              />

              {/* Edit button for Profile Picture */}
              <button
                onClick={() => {
                  setModalType("profilePhoto");
                  onOpen();
                }}
                className="absolute bottom-3 right-3  bg-base  p-2 rounded-full shadow-lg  "
              >
                <MdEditSquare size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold flex gap-3 justify-center items-center">
            {loggedInUser?.name}{" "}
            {loggedInUser?.isVerified && (
              <FaCheckCircle size={20} className="inline text-green-500 " />
            )}
          </h1>
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
