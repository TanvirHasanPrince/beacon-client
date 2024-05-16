"use client";
import { useAdminQuery } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaGlobe,
  FaInfoCircle,
  FaClock,
} from "react-icons/fa";
import React from "react";
import moment from "moment";

const AdminProfilePage = () => {
  const { role, userId } = getUserInfo() as any;

  const { data: adminData, isLoading, isError } = useAdminQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (isError || !adminData) {
    return <div>Error occurred while fetching data.</div>; // Render error state if data fetching fails
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
    <>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {`${firstName} ${middleName} ${lastName}`}
        </h5>

        <div className=" flex flex-col items-center justify-center overflow-hidden w-96">
          {/* Render admin information */}
          <div className="p-4">
            <div className="mb-2">
              <FaUser className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for name */}
              {firstName} {middleName && `${middleName} `} {lastName}
            </div>
            <div className="mb-2">
              <FaEnvelope className="inline-block mr-2 text-red-500" />{" "}
              {/* Icon for email */}
              {email}
            </div>
            <div className="mb-2">
              <FaPhoneAlt className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for phone number */}
              {mobile}
            </div>
          </div>

          <div className="mb-2">
            <span className="font-semibold">
              <FaClock className="inline-block mr-2  text-red-500" />
              Created on:
            </span>{" "}
            {formattedCreatedAt}
          </div>
          <div className="mb-4">
            <span className="font-semibold">
              <FaClock className="inline-block mr-2  text-red-500" />
              Last updated
            </span>{" "}
            {formattedUpdatedAt}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfilePage;
