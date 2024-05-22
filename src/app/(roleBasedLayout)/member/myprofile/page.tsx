"use client";
import { useMemberQuery } from "@/redux/api/memberApi";
import { getUserInfo } from "@/services/auth.service";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaInfoCircle,
  FaCalendar,
  FaGlobeAmericas,
  FaHeart,
} from "react-icons/fa";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { tailwindButtonClass } from "@/components/tailwindClasses";

const MyProfilePage = () => {
  const { userId } = getUserInfo() as any;

  const { data: memberData, isLoading, isError } = useMemberQuery(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError || !memberData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error occurred while fetching data.
      </div>
    );
  }

  const {
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    bio,
    profilePhoto,
    coverPhoto,
    country,
    interest,
  } = memberData.data;

  const { pets } = memberData?.data;

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
            <p>{bio}</p>
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
              <FaHeart className="text-pink-500 mr-2" />
              {interest.map((int: any, i: number) => (
                <span key={i}>{int},</span>
              ))}
            </div>
          </div>

          {/* Pets Start! */}

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 text-center">My Pets</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center ">
              {pets.map((pet: any) => (
                <div
                  key={pet.id}
                  className="rounded-lg shadow-lg overflow-hidden mx-2 mb-4 flex flex-col items-center justify-center"
                >
                  <div className="relative h-24 w-24 mx-auto">
                    <Image
                      src={pet.photo}
                      alt={pet.petName}
                      fill
                      className="object-cover rounded-2xl mt-2"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="font-semibold">{pet.petName}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Age:</span> {pet.age}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pets End! */}
          <div className="flex justify-center">
            <Link href={"/member/pets/addPet"}>
              <button className={`${tailwindButtonClass}`}>Add Pet</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
