"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddEventMutation } from "@/redux/api/eventApi";
import { getUserInfo } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { ENUM_OF_EVENT_CATEGORIES } from "@/enums/sharedEnums";

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [addEventMutation, { isLoading, isError, error }] =
    useAddEventMutation();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const currentDateTime = new Date().toISOString().slice(0, 16);
    const dateTimeInput = document.getElementById(
      "date_time"
    ) as HTMLInputElement | null;
    if (dateTimeInput) {
      dateTimeInput.min = currentDateTime;
    }
  }, []);

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    try {
      const { userId } = getUserInfo() as any;
      data.memberId = userId;
      // Convert date_time to ISO string format
      data.date_time = new Date(data.date_time).toISOString();
      console.log(data);
      await addEventMutation(data);
      toast.success(`Event added successfully!`);
      reset();
    } catch (error) {
      toast.error("Could not add event");
      console.error("An error occurred:", error);
    }
    setSubmitting(false);
  };

  // Get current date and time in ISO string format
  const currentDate = new Date().toISOString().slice(0, 16); // Remove milliseconds

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Add Event</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col w-full max-w-md"
      >
        <div className="mb-4 w-full">
          <label className="block mb-2">Event Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Event Title"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Date and Time</label>
          <input
            type="datetime-local"
            {...register("date_time", { required: true })}
            id="date_time"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.date_time && (
            <p className="text-red-500">Date and Time are required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            {...register("location")}
            placeholder="Location"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Organizer</label>
          <input
            type="text"
            {...register("organizer")}
            placeholder="Organizer"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Categories</label>
          <select
            {...register("categories")}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {Object.values(ENUM_OF_EVENT_CATEGORIES).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">RSVP Link</label>
          <input
            type="text"
            {...register("rsvp_link")}
            placeholder="RSVP Link"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Additional Info</label>
          <textarea
            {...register("additional_info")}
            placeholder="Additional Info"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 mb-8 bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-28 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {submitting ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
