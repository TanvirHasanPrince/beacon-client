"use client";
import { tailwindButtonClass } from "@/components/tailwindClasses";
import { useEventQuery, useSubscribeEventMutation } from "@/redux/api/eventApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

interface Iparams {
  id: string;
}

const EventsSubscribePage = ({ params }: { params: Iparams }) => {
  const { id: eventId } = params;
  const {
    data: eventResponse,
    isLoading: isEventLoading,
    error: eventError,
  } = useEventQuery(eventId);
  const [subscribeEvent] = useSubscribeEventMutation();

  const event = eventResponse?.data;

  if (isEventLoading) return <div>Loading event details...</div>;
  if (eventError) return <div>Error loading event details.</div>;

  const { userId } = getUserInfo() as any;

  const handleSubscribe = async () => {
    try {
      const response = await subscribeEvent({
        id: eventId,
        subscriberId: userId,
      }).unwrap();
      console.log("Subscription response:", response);
      toast.success("Subscription successful!");
    } catch (error) {
      alert("Failed to subscribe to event.");
    }
  };

  return (
    <div className="flex mt-4 flex-col justify-center items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="relative">
            <Image
              src={event.photo}
              alt={event.title}
              width={500}
              height={250}
              className="object-cover rounded-xl"
            />
          </div>
          <div className="p-4">
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
              <div className="w-1/2 mt-4">
                <p className="font-semibold">Categories:</p>
                <p>{event.categories}</p>
              </div>
              <div className="w-1/2 pl-4 mt-4">
                <p className="font-semibold">Additional Info:</p>
                <p>{event.additional_info}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSubscribe} className={`${tailwindButtonClass}`}>
        Subscribe
      </button>
    </div>
  );
};

export default EventsSubscribePage;
