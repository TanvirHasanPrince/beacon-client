"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddEventMutation } from "@/redux/api/eventApi";
import { getUserInfo } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import {
  ENUM_OF_EVENT_CATEGORIES,
  ENUM_CITIES_OF_UK,
} from "@/enums/sharedEnums";
import Image from "next/image";
import eventPlaceholder from "../../../../../assets/Events/Default_People_having_fun_at_a_coffee_shop_The_vibe_is_fun_and_0.jpg";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    try {
      const { userId } = getUserInfo() as any;
      data.memberId = userId;
      // Convert date_time to ISO string format
      data.date_time = new Date(data.date_time).toISOString();

      // Upload photo to Cloudinary if file is selected
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("file", data.photo[0]);
        formData.append("upload_preset", "beaconPreset");

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const imageData = await uploadResponse.json();
        data.photo = imageData.secure_url;
      }
      console.log(data);
      await addEventMutation(data);
      toast.success(`Event added successfully!`);
      router.push("/member/events/myEvents");
      reset();
    } catch (error) {
      toast.error("Could not add event");
      console.error("An error occurred:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold tracking-tighter md:text-4xl mt-2">
          Add Your Event Today!
        </h1>
        <div className="mt-4 mb-2">
          <Image
            alt="Tech Conference Venue"
            className="mx-auto rounded-lg"
            height="500"
            src={eventPlaceholder}
            width="500"
          />
        </div>
      </div>
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
            className="w-full md:w-auto border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            placeholder="Location"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.location && (
            <p className="text-red-500">Location is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Organizer</label>
          <input
            type="text"
            {...register("organizer", { required: true })}
            placeholder="Organizer"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.organizer && (
            <p className="text-red-500">Organizer is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">City</label>
          <select
            {...register("city", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-gray-100 hover:bg-sky-100 hover:text-black cursor-pointer"
          >
            {Object.values(ENUM_CITIES_OF_UK).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500">City is required</p>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Categories</label>
          <select
            {...register("categories", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-gray-100 hover:bg-sky-100 hover:text-black cursor-pointer"
          >
            {Object.values(ENUM_OF_EVENT_CATEGORIES).map((category) => (
              <option
                key={category}
                value={category}
                className="hover:bg-sky-100 w-fit hover:text-black"
              >
                {category}
              </option>
            ))}
          </select>
          {errors.categories && (
            <p className="text-red-500">Category is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Photo</label>
          <input
            type="file"
            {...register("photo")}
            className="w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
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
          className="mt-2 mb-8 bg-gradient-to-r from-violet-300 to-fuchsia-300 hover:bg-blue-600 text-black font-semibold py-2 px-28 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {submitting ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
