"use client";
import React from "react";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaGlobe,
  FaInfoCircle,
  FaClock,
} from "react-icons/fa";
import moment from "moment";
import { useDoctorQuery } from "@/redux/api/doctorApi";
import { getUserInfo } from "@/services/auth.service";

const DoctorProfilePage = () => {
  const { role, userId } = getUserInfo() as any;

  const { data: doctorData, isLoading, isError } = useDoctorQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !doctorData) {
    return <div>Error occurred while fetching data.</div>; // Render error state if data fetching fails
  }

  // Destructure doctor data
  const {
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    country,
    workExperience,
    licenseNumber,
    affiliation,
    specializations,
    verificationDocuments,
    availability,
    createdAt,
    updatedAt,
    profilePhoto,
  } = doctorData.data;

  console.log(doctorData);

  const formattedCreatedAt = moment(createdAt).format("MMMM Do YYYY, h:mm a");
  const formattedUpdatedAt = moment(updatedAt).format("MMMM Do YYYY, h:mm a");

  return (
    // <div>here</div>
    <>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={profilePhoto}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {`${firstName} ${middleName} ${lastName}`}
        </h5>

        <div className=" flex flex-col items-center justify-center overflow-hidden w-96">
          {/* Render doctor information */}
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
            <div className="mb-2">
              <FaGlobe className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for country */}
              {country}
            </div>
            <div className="mb-2">
              <FaInfoCircle className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for work experience */}
              {workExperience}
            </div>
            <div className="mb-2">
              <FaInfoCircle className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for license number */}
              {licenseNumber}
            </div>
            <div className="mb-2">
              <FaInfoCircle className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for affiliation */}
              {affiliation}
            </div>
            <div className="mb-2">
              <FaInfoCircle className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for specializations */}
              {specializations}
            </div>
            {/* Render verification documents */}
            {verificationDocuments && verificationDocuments.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Verification Documents:</span>
                <div>
                  {verificationDocuments.map((doc: any, index: any) => (
                    <img
                      key={index}
                      src={doc}
                      alt={`Verification Document ${index}`}
                      className="w-24 h-24 mx-2"
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="mb-2">
              <FaInfoCircle className="inline-block mr-2  text-red-500" />{" "}
              {/* Icon for availability */}
              <span className="font-semibold">Availability:</span>
              <ul>
                {availability.map((day: string, index: number) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
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
      </div>
    </>
  );
};

export default DoctorProfilePage;
