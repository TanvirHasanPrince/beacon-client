// SubscribersList.tsx
"use client";
import React from "react";
import { useMemberQuery } from "@/redux/api/memberApi";
import Image from "next/image";

const Subscriber = ({ id }: { id: string }) => {
  const {
    data: memberResponse,
    isLoading: isMemberLoading,
    error,
  } = useMemberQuery(id);
  const member = memberResponse?.data;

  if (isMemberLoading)
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-24">
        <p className="text-red-500 font-semibold">Error loading subscriber.</p>
      </div>
    );

  return member ? (
    <div className=" rounded-lg shadow-lg overflow-hidden mx-2 mb-4 flex flex-col items-center justify-center">
      <div className="relative h-24 w-24 mx-auto">
        <Image
          src={member.profilePhoto}
          alt={member.firstName}
          fill
          className="object-cover rounded-2xl mt-2"
        />
      </div>
      <div className="p-2 text-center">
        <p className="font-semibold">
          {member.firstName} {member.lastName}
        </p>
      </div>
    </div>
  ) : null;
};

const SubscribersList = ({ subscriberIds }: { subscriberIds: any }) => {
  if (!subscriberIds || subscriberIds.length === 0) {
    return (
      <div className="text-gray-500 font-semibold">No subscribers found.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 justify-center">
      {subscriberIds.map((id: string) => (
        <Subscriber key={id} id={id} />
      ))}
    </div>
  );
};

export default SubscribersList;
