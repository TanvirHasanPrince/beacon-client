"use client";
import { useAdminQuery } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import { FaEnvelope, FaPhoneAlt, FaUser, FaClock } from "react-icons/fa";
import React from "react";
import moment from "moment";

const AdminProfilePage = () => {
  const { role, userId } = getUserInfo() as any;

  const { data: adminData, isLoading, isError } = useAdminQuery(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    ); // Centered loading state
  }

  if (isError || !adminData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error occurred while fetching data.
      </div>
    ); // Centered error state
  }

  // Destructure admin data
  const {
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    createdAt,
    updatedAt,
    // Add other fields if needed
  } = adminData.data;

  const formattedCreatedAt = moment(createdAt).format("MMMM Do YYYY, h:mm a");
  const formattedUpdatedAt = moment(updatedAt).format("MMMM Do YYYY, h:mm a");

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 sm:w-96">
        <div className="flex flex-col items-center pb-6">
          <h5 className="mb-1 text-2xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent">
            {firstName} {middleName && `${middleName} `} {lastName}
          </h5>
          <p className="text-gray-600">Admin Profile</p>
        </div>

        <div className="flex flex-col items-center w-full">
          {/* Render admin information */}
          <div className="w-full mb-4">
            <div className="flex items-center mb-4 text-gray-700">
              <FaUser className="inline-block mr-2 text-blue-500" />
              <span className="text-lg">
                {firstName} {middleName && `${middleName} `} {lastName}
              </span>
            </div>
            <div className="flex items-center mb-4 text-gray-700">
              <FaEnvelope className="inline-block mr-2 text-blue-500" />
              <span className="text-lg">{email}</span>
            </div>
            <div className="flex items-center mb-4 text-gray-700">
              <FaPhoneAlt className="inline-block mr-2 text-blue-500" />
              <span className="text-lg">{mobile}</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center mb-2 text-gray-700">
              <FaClock className="inline-block mr-2 text-blue-500" />
              <span className="font-semibold">Created on:</span>
              <span className="ml-1">{formattedCreatedAt}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="inline-block mr-2 text-blue-500" />
              <span className="font-semibold">Last updated:</span>
              <span className="ml-1">{formattedUpdatedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
