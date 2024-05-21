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

  if (isMemberLoading) return <div>Loading subscriber...</div>;
  if (error) return <div>Error loading subscriber.</div>;

  return (
    member && (
      <div style={{ margin: "10px", textAlign: "center" }}>
        <Image
          src={member.profilePhoto}
          alt={member.firstName}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
          width={500}
          height={500}
        />
        <p>
          {member.firstName} {member.lastName}
        </p>
      </div>
    )
  );
};

const SubscribersList = ({ subscriberIds }: { subscriberIds: any }) => {
  if (!subscriberIds || subscriberIds.length === 0) {
    return <div>No subscribers found.</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {subscriberIds.map((id: string) => (
        <Subscriber key={id} id={id} />
      ))}
    </div>
  );
};

export default SubscribersList;
