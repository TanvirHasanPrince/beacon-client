"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getUserInfo } from "@/services/auth.service";
import { useDoctorsQuery } from "@/redux/api/doctorApi";

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
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const { data: doctorsData } = useDoctorsQuery({}) as { data: DoctorsData };

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
      data.doctorId = parseInt(data.doctorId);
      data.startDate = new Date(data.startDate).toISOString();
      data.endDate = new Date(data.endDate).toISOString();

      console.log(data);
    } catch (error) {
      toast.error("Could not add event");
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
            {...register("startDate", { required: true })}
            id="startDate"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            min={currentDateTime}
          />
          {errors.startDate && (
            <p className="text-red-500">Start Date and Time are required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">End Time</label>
          <input
            min={currentDateTime}
            type="datetime-local"
            {...register("endDate", { required: true })}
            id="endDate"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.endDate && (
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
    </div>
  );
};

export default CreateConsultationPage;
