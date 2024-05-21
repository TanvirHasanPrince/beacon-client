"use client";
import React from "react";
import { useEventQuery } from "@/redux/api/eventApi";
import Image from "next/image";

interface Iparams {
  id: string;
}

const MyEventDetailsPage = ({ params }: { params: Iparams }) => {
  const { id: eventId } = params;
  const {
    data: eventResponse,
    isLoading: isEventLoading,
    error: eventError,
  } = useEventQuery(eventId);
  const event = eventResponse?.data;

  if (isEventLoading) return <div>Loading event details...</div>;
  if (eventError) return <div>Error loading event details.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="relative h-96">
          <Image
            src={event.photo}
            alt={event.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="flex flex-wrap mb-4">
            <div className="w-1/2 pr-4 mb-4">
              <p className="font-semibold">City:</p>
              <p>{event.city}</p>
            </div>
            <div className="w-1/2 pl-4 mb-4">
              <p className="font-semibold">Date and Time:</p>
              <p>
                {new Date(event.date_time).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
                <br />
                {new Date(event.date_time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="w-1/2 pr-4">
              <p className="font-semibold">Location:</p>
              <p>{event.location}</p>
            </div>
            <div className="w-1/2 pl-4">
              <p className="font-semibold">Organizer:</p>
              <p>{event.organizer}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Categories:</p>
            <p>{event.categories}</p>
          </div>
          <div>
            <p className="font-semibold">Additional Info:</p>
            <p>{event.additional_info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEventDetailsPage;
