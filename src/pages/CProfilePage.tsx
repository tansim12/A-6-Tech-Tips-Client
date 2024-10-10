"use client"
// pages/profile.tsx
import React, { useState } from "react";
import { Button, Modal, Input } from "@nextui-org/react"; // Next UI components
import Image from "next/image";
import { useUser } from "../Context/user.context";
import { useGetUserProfileData } from "../hooks/userProfile.hook";



const CProfilePage = ({params}:{params:any}) => {
    const {user:loggedInUser} = useUser()
    const{data} = useGetUserProfileData()
  // State for profile details and editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Tansim Ahmed Tasdid",
    bio: "Camping enthusiast and traveler",
    posts: [
      { id: 1, content: "Loving the outdoors! 🌲🔥" },
      { id: 2, content: "Just got a new tent. Excited to try it out!" },
    ],
    followers: ["Follower 1", "Follower 2", "Follower 3"],
    following: ["User 1", "User 2", "User 3"],
  });

  // State for edited profile fields
  const [editedProfile, setEditedProfile] = useState({
    name: profile.name,
    bio: profile.bio,
  });

  // Toggle modal visibility
  const toggleEditModal = () => {
    setIsEditing(!isEditing);
  };

  // Handle form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile edits
  const handleSave = () => {
    setProfile({ ...profile, ...editedProfile });
    toggleEditModal();
  };

  return (
    <div className="min-h-screen ">
      {/* Cover Section */}
      <div className="relative w-full h-64 bg-gray-300">
        <Image
          src="/cover-photo.jpg" // Replace with your cover photo path
          layout="fill"
          objectFit="cover"
          alt="Cover Photo"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          {/* Profile Picture */}
          <div className="relative h-36 w-36 rounded-full border-4 border-white overflow-hidden">
            <Image
              src="/profile-pic.jpg" // Replace with your profile picture path
              layout="fill"
              objectFit="cover"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-gray-500">{profile.bio}</p>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-center gap-2">
          <Button auto color="primary" onClick={toggleEditModal}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal open={isEditing} onClose={toggleEditModal}>
        <Modal.Header>
          <h2>Edit Profile</h2>
        </Modal.Header>
        <Modal.Body>
          <Input
            fullWidth
            name="name"
            label="Name"
            value={editedProfile.name}
            onChange={handleInputChange}
          />
          <Input
            fullWidth
            name="bio"
            label="Bio"
            value={editedProfile.bio}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={toggleEditModal}>
            Cancel
          </Button>
          <Button auto onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Navigation Tabs */}
      <div className="border-b mt-8">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-4">
            <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
              Posts
            </li>
            <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
              Followers
            </li>
            <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
              Following
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="container mx-auto mt-8 px-4">
        {/* Posts Section */}
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="space-y-4 mt-4">
          {profile.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow-md text-gray-800"
            >
              {post.content}
            </div>
          ))}
        </div>

        {/* Followers Section */}
        <h2 className="text-xl font-semibold mt-8">Followers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {profile.followers.map((follower, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gray-300" />
              <p className="text-sm mt-2">{follower}</p>
            </div>
          ))}
        </div>

        {/* Following Section */}
        <h2 className="text-xl font-semibold mt-8">Following</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {profile.following.map((user, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gray-300" />
              <p className="text-sm mt-2">{user}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CProfilePage;
