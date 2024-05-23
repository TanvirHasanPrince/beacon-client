"use client";
import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaGlobeAmericas,
  FaInfoCircle,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useDoctorQuery } from "@/redux/api/doctorApi";
import { getUserInfo } from "@/services/auth.service";
import { tailwindButtonClass } from "@/components/tailwindClasses";

const DoctorProfilePage = () => {
  const { role, userId } = getUserInfo() as any;
  const { data: doctorData, isLoading, isError } = useDoctorQuery(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError || !doctorData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error occurred while fetching data.
      </div>
    );
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
    coverPhoto,
  } = doctorData.data;

  const formattedCreatedAt = moment(createdAt).format("MMMM Do YYYY, h:mm a");
  const formattedUpdatedAt = moment(updatedAt).format("MMMM Do YYYY, h:mm a");

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto rounded-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-blue-500">
          <Image
            src={coverPhoto}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
        {/* Profile Header */}
        <div className="flex items-center -mt-16 px-6 py-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500">
            <Image
              src={profilePhoto}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="ml-6 mt-12">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-blue-700 to-blue-500 inline-block text-transparent bg-clip-text">
              {`${firstName} ${middleName ? `${middleName} ` : ""}${lastName}`}
            </h2>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-center">
          <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2 flex items-center">
              <FaUser className="inline-block mr-2" /> Edit Profile
            </button>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
              <FaCalendar className="inline-block mr-2" /> Consultations
            </button>
          </div>
        </div>
        {/* Profile Details */}
        <div className="px-6 py-4">
          <div className="mb-4 text-gray-700">
            <div className="flex items-center mb-2">
              <FaInfoCircle className="text-pink-500 mr-2" />
              <span className="font-semibold">About Me</span>
            </div>
            <p>{workExperience}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="text-pink-500 mr-2" />
              <span>{email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaPhoneAlt className="text-pink-500 mr-2" />
              <span>{mobile}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaGlobeAmericas className="text-pink-500 mr-2" />
              <span>{country}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaInfoCircle className="text-pink-500 mr-2" />
              <span>{licenseNumber}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaInfoCircle className="text-pink-500 mr-2" />
              <span>{affiliation}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaInfoCircle className="text-pink-500 mr-2" />
              <span>{specializations}</span>
            </div>
          </div>

          {/* Verification Documents Start! */}
          {verificationDocuments && verificationDocuments.length > 0 && (
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Verification Documents
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                {verificationDocuments.map((doc: any, index: any) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-lg overflow-hidden mx-2 mb-4 flex flex-col items-center justify-center"
                  >
                    <div className="relative h-24 w-24 mx-auto">
                      <Image
                        src={doc}
                        alt={`Verification Document ${index}`}
                        fill
                        className="object-cover rounded-2xl mt-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Verification Documents End! */}

          <div className="flex justify-center">
            <Link href={"/doctor/documents/addDocument"}>
              <button className={`${tailwindButtonClass}`}>Add Document</button>
            </Link>
          </div>

          <div className="mt-4">
            <div className="mb-2">
              <FaClock className="inline-block mr-2 text-pink-500" />
              <span className="font-semibold">Created on:</span>{" "}
              {formattedCreatedAt}
            </div>
            <div className="mb-2">
              <FaClock className="inline-block mr-2 text-pink-500" />
              <span className="font-semibold">Last updated:</span>{" "}
              {formattedUpdatedAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
