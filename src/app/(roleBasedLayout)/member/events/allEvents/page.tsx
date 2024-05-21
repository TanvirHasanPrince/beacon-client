"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useEventsQuery } from "@/redux/api/eventApi";
import Image from "next/image";
import { tailwindButtonClass } from "@/components/tailwindClasses";

interface Event {
  id: string;
  title: string;
  date_time: string;
  location: string;
  photo: string;
  categories: string;
  city: string;
}

const EventCard = ({ event }: { event: any }) => {
  return (
    <div className="flex flex-col items-center justify-center shadow-xl rounded-lg overflow-hidden mb-4">
      <Image
        src={event.photo}
        alt={event.title}
        className="w-full"
        width={500}
        height={500}
      />
      <div className="p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <p className="text-gray-600">
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
        <p className="text-gray-600">{event.location}</p>
      </div>
      <Link href={`/events/${event.id}`}>
        <button className={tailwindButtonClass}>View Details</button>
      </Link>
    </div>
  );
};

const AllEventsPage = () => {
  const { data: eventsData, error, isLoading } = useEventsQuery({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const eventsArray = eventsData.data;
  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };
  const handleCityChange = (e: any) => {
    setSelectedCity(e.target.value);
  };
  // const handleResetFilters = () => {
  //   setSelectedCategory("");
  //   setSelectedCity("");
  // };

  const filteredEvents = eventsArray.filter((event: any) => {
    return (
      (selectedCategory ? event.categories === selectedCategory : true) &&
      (selectedCity ? event.city === selectedCity : true)
    );
  });

  const uniqueCategories = Array.from(
    new Set(eventsArray.map((event: any) => event.categories))
  ) as string[];

  const uniqueCities = Array.from(
    new Set(eventsArray.map((event: any) => event.city))
  ) as string[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">All Events</h1>
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
              {uniqueCategories.map((category) => (
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
              {uniqueCities.map((city) => (
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
        {/* <button
          onClick={handleResetFilters}
          className={`${tailwindButtonClass} mt-6 px-4 py-2`}
        >
          Reset Filters
        </button> */}
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
