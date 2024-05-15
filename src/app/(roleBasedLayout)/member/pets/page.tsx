"use client";
import { useMemberQuery } from "@/redux/api/memberApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";

const PetsPage = () => {
  const { userId } = getUserInfo() as any;
  const { data: memberData, isLoading, isError } = useMemberQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (isError || !memberData) {
    return <div>Error occurred while fetching data.</div>; // Render error state if data fetching fails
  }

  const { pets } = memberData.data;

  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={"/member/pets/addPet"}>
        <button className="bg-red-500 py-2 px-8 text-white mb-4">
          Add Pet
        </button>
      </Link>
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold mb-4">Your Pets</h1>
        {pets.map((pet: any) => (
          <div key={pet.id} className="p-16 border border-gray-300 rounded-md ">
            <img
              src={pet.photo}
              alt={pet.petName}
              className="w-24 h-24 mb-2 rounded-full shadow-lg"
            />
            <h3 className="text-lg font-semibold mb-1 text-center">
              {pet.petName}
            </h3>
            <p className="text-sm mb-1">
              <span className="font-semibold">Species:</span> {pet.species}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Age:</span> {pet.age}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Description:</span>{" "}
              {pet.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsPage;
