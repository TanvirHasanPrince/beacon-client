"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getUserInfo } from "@/services/auth.service";
import { useDoctorsQuery } from "@/redux/api/doctorApi";
import Link from "next/link";
import { useAddConsultationMutation } from "@/redux/api/consultationApi";

interface FormData {
  startTime: string;
  endTime: string;
  doctorId: string;
}

interface Consultation {
  id: number;
  startTime: string;
  endTime: string;
  memberId: string;
  doctorId: string;
  meetingLink: string;
  createdAt: string;
  updatedAt: string;
}

interface Doctor {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  country: string;
  workExperience: string;
  licenseNumber: string;
  affiliation: string;
  specializations: string;
  verificationDocuments: string[];
  availability: string[];
  role: string;
  profilePhoto: string;
  consultations: Consultation[];
  createdAt: string;
  updatedAt: string;
}

interface DoctorsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Doctor[];
}

interface DoctorsData {
  doctors: DoctorsResponse;
}

const CreateConsultationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const { data: doctorsData } = useDoctorsQuery({}) as { data: DoctorsData };
  const [addConsultation, { isLoading }] = useAddConsultationMutation();

  useEffect(() => {
    const currentDateTime = new Date().toISOString().slice(0, 16);
    const dateTimeInput = document.getElementById(
      "date_time"
    ) as HTMLInputElement | null;
    if (dateTimeInput) {
      dateTimeInput.min = currentDateTime;
    }
  }, []);

  const { userId } = getUserInfo() as any;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true);
    try {
      const { userId } = getUserInfo() as any;

      // Convert date strings to Date objects
      const startTimeDate = new Date(data.startTime);
      const endTimeDate = new Date(data.endTime);

      // Check if startTime and endTime are valid dates
      if (isNaN(startTimeDate.getTime()) || isNaN(endTimeDate.getTime())) {
        throw new Error("Invalid start or end time");
      }

      const formData = {
        startTime: startTimeDate.toISOString(),
        endTime: endTimeDate.toISOString(),
        memberId: userId,
        doctorId: parseInt(data.doctorId),
        meetingLink: `${process.env.NEXT_PUBLIC_BROWSER_URL}/meetingRoom/${userId}`,
      };

      await addConsultation(formData).unwrap();
      toast.success("Consultation added successfully");
    } catch (error) {
      toast.error("Could not add consultation");
      console.error("An error occurred:", error);
    }
    setSubmitting(false);
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Consult a Doctor</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col w-full max-w-md"
      >
        <div className="mb-4 w-full">
          <label className="block mb-2">Start Time</label>
          <input
            type="datetime-local"
            {...register("startTime", { required: true })}
            id="startDate"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            min={currentDateTime}
          />
          {errors.startTime && (
            <p className="text-red-500">Start Date and Time are required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">End Time</label>
          <input
            min={currentDateTime}
            type="datetime-local"
            {...register("endTime", { required: true })}
            id="endDate"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.endTime && (
            <p className="text-red-500">End Date and Time are required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Doctors</label>
          <select
            {...register("doctorId")}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {doctorsData?.doctors?.data?.map((doctor: any) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.id} {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 mb-8 bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-28 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {submitting ? "Adding..." : "Submit"}
        </button>
      </form>

      <Link href={`/meetingRoom/${userId}`}>
        <button className="bg-red-500 py-2 px-8 text-white mb-4">
          Join call
        </button>
      </Link>
    </div>
  );
};

export default CreateConsultationPage;
