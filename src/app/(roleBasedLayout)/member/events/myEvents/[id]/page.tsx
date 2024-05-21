"use client";
import React from "react";
import { getUserInfo } from "@/services/auth.service";
import { useEventQuery } from "@/redux/api/eventApi";
import Image from "next/image";
import SubscribersList from "../SubscribersList/SubscribersList";

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
    <div>
      <h1>{event.title}</h1>
      <Image
        src={event.photo}
        alt={event.title}
        width={500}
        height={500}
        style={{ width: "100%", height: "auto" }}
      />
      <p>{event.description}</p>
      <p>
        <strong>City:</strong> {event.city}
      </p>
      <p>
        <strong>Date and Time:</strong>{" "}
        {new Date(event.date_time).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Organizer:</strong> {event.organizer}
      </p>
      <p>
        <strong>Categories:</strong> {event.categories}
      </p>
      <p>
        <strong>Additional Info:</strong> {event.additional_info}
      </p>

      <h2>Subscribers</h2>
      <SubscribersList subscriberIds={event.subscribers_id} />
    </div>
  );
};

export default MyEventDetailsPage;
