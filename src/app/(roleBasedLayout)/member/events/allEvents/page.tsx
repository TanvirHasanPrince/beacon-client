"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useEventsQuery } from "@/redux/api/eventApi";
import Image from "next/image";
import {
  tailwindButtonClass,
  tailwindPageTitleClass,
} from "@/components/tailwindClasses";
import { FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event }: { event: any }) => {
  return (
    <Link href={`/member/events/allEvents/${event.id}`} key={event.id}>
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

const AllEventsPage = () => {
  const { data: eventsData, error, isLoading } = useEventsQuery({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const eventsArray = eventsData.data;

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const filteredEvents = eventsArray.filter((event: any) => {
    return (
      (selectedCategory ? event.categories === selectedCategory : true) &&
      (selectedCity ? event.city === selectedCity : true)
    );
  });

  // Ensure uniqueCategories is typed correctly
  const uniqueCategories: string[] = Array.from(
    new Set(eventsArray.map((event: any) => event.categories))
  );
  const uniqueCities: string[] = Array.from(
    new Set(eventsArray.map((event: any) => event.city))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${tailwindPageTitleClass} my-2 text-center`}>
        All Events
      </h1>
      <div className="flex flex-wrap justify-center mb-8 gap-4">
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2 font-medium text-gray-700">
            Category:
          </label>
          <div className="relative">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
            >
              <option value="">All</option>
              {uniqueCategories.map((category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-2 font-medium text-gray-700">
            City:
          </label>
          <div className="relative">
            <select
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
            >
              <option value="">All</option>
              {uniqueCities.map((city: string) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;
