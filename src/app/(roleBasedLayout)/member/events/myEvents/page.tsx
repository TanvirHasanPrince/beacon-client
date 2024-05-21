"use client";
import {
  tailwindButtonClass,
  tailwindPageTitleClass,
} from "@/components/tailwindClasses";
import { useMemberQuery } from "@/redux/api/memberApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserAlt,
  FaTags,
  FaInfoCircle,
} from "react-icons/fa";

// Define the EventPage component
const EventPage = () => {
  // Fetch user ID from user info
  const { userId } = getUserInfo() as any;

  // Fetch member data using user ID
  const { data: memberData, isLoading, isError } = useMemberQuery(userId);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError || !memberData) {
    return <div>Error occurred while fetching data.</div>;
  }

  // Extract events data from member data
  const { events } = memberData.data;

  // Render the component
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Heading */}
      <h1 className={`${tailwindPageTitleClass}`}>Your Events</h1>
      {/* Display events */}
      <div className="mt-4 px-8">
        {events.map((event: any) => (
          <>
            <Link href={`/member/events/myEvents/${event.id}`}>
              <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-xl p-6 mb-8 w-full max-w-3xl">
                <p className="text-xl mb-2 text-gray-600 font-semi-bold">
                  {event.title}
                </p>
                <div
                  key={event.id}
                  className="flex items-center justify-center "
                >
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
          </>
        ))}
      </div>

      {/* Link to add event */}
      <Link href={"/member/events/addEvent"}>
        <button className={`${tailwindButtonClass}`}>Create Event</button>
      </Link>
    </div>
  );
};

// Export the component
export default EventPage;
