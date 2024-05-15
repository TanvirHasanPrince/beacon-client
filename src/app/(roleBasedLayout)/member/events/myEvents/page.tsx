"use client";
import { useMemberQuery } from "@/redux/api/memberApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserAlt,
  FaTags,
  FaInfoCircle,
} from "react-icons/fa";

const EventPage = () => {
  const { userId } = getUserInfo() as any;
  const { data: memberData, isLoading, isError } = useMemberQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (isError || !memberData) {
    return <div>Error occurred while fetching data.</div>; // Render error state if data fetching fails
  }

  const { events } = memberData.data;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Your Events</h1>
      <div className="p-8">
        {events.map((event: any) => (
          <div
            key={event.id}
            className="flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-lg p-6 mb-8 w-full max-w-3xl"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {event.title}
            </h3>
            <p className="text-sm mb-2 text-gray-600">
              <FaCalendarAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {new Date(event.date_time).toLocaleString()}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              <FaMapMarkerAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {event.location}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              <FaUserAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {event.organizer}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              <FaTags className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {event.categories}
            </p>
            <a
              href={event.rsvp_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm mb-2 text-blue-500 hover:text-blue-700 underline"
            >
              RSVP Here
            </a>
            <p className="text-sm mb-2 text-gray-600">
              <FaInfoCircle className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {event.additional_info}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
