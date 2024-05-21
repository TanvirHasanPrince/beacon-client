"use client";
import { tailwindPageTitleClass } from "@/components/tailwindClasses";
import { useMemberQuery } from "@/redux/api/memberApi";
import { useEventQuery } from "@/redux/api/eventApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

// Component to fetch and display individual event details
const SubscribedEvent = ({ eventId }: { eventId: any }) => {
  const { data: eventData, isLoading, isError } = useEventQuery(eventId);

  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (isError || !eventData) {
    return <div>Error loading event details.</div>;
  }

  const event = eventData.data;

  return (
    <Link href={`/member/events/subscribedEvents/${event.id}`} key={event.id}>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-xl p-6 mb-8 w-full max-w-3xl">
        <p className="text-xl mb-2 text-gray-600 font-semi-bold">
          {event.title}
        </p>
        <div className="flex items-center justify-center">
          <Image
            src={event.photo}
            alt={event.title}
            className="w-28 h-auto mr-8"
            width={250}
            height={250}
          />
          <div className="flex flex-col justify-start">
            <p className="text-sm mb-2 text-red-600 font-bold">
              {new Date(event.date_time).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
              {", "}
              {new Date(event.date_time).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              <FaMapMarkerAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {event.location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Define the MySubscribedEvents component
const MySubscribedEvents = () => {
  const { userId } = getUserInfo() as any;
  const { data: memberData, isLoading, isError } = useMemberQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !memberData) {
    return <div>Error occurred while fetching data.</div>;
  }

  const subscribedEventIds = memberData.data.subscribed_events || [];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={`${tailwindPageTitleClass}`}>Your Subscribed Events</h1>
      <div className="mt-4 px-8">
        {subscribedEventIds.map((eventId: any) => (
          <SubscribedEvent key={eventId} eventId={eventId} />
        ))}
      </div>
    </div>
  );
};

export default MySubscribedEvents;
