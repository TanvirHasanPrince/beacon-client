"use client";
import { useMemberQuery } from "@/redux/api/memberApi";
import { useDoctorQuery } from "@/redux/api/doctorApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaUserAlt, FaLink } from "react-icons/fa";

const MyConsultationsPage = () => {
  const { userId } = getUserInfo() as any;
  const {
    data: memberData,
    isLoading: isLoadingMember,
    isError: isErrorMember,
  } = useMemberQuery(userId);

  if (isLoadingMember) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (isErrorMember || !memberData) {
    return <div>Error occurred while fetching data.</div>; // Render error state if data fetching fails
  }

  const { consultations } = memberData.data;

  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={"/member/consultations/createConsultation"}>
        <button className="bg-red-500 py-2 px-8 text-white mb-4">
          Consult a doctor
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Your Consultations
      </h1>
      <div className="p-8">
        {consultations.map((consultation: any) => (
          <ConsultationCard key={consultation.id} consultation={consultation} />
        ))}
      </div>
    </div>
  );
};

const ConsultationCard = ({ consultation }: { consultation: any }) => {
  const {
    data: doctorData,
    isLoading: isLoadingDoctor,
    isError: isErrorDoctor,
  } = useDoctorQuery(consultation.doctorId);

  if (isLoadingDoctor) {
    return <div>Loading doctor info...</div>; // Render loading state while fetching doctor data
  }

  if (isErrorDoctor || !doctorData) {
    return <div>Error occurred while fetching doctor info.</div>; // Render error state if doctor data fetching fails
  }

  const { firstName, middleName, lastName } = doctorData.data;
  const doctorName = [firstName, middleName, lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-lg p-6 mb-8 w-full max-w-3xl">
      <p className="text-sm mb-2 text-gray-600">
        <FaCalendarAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
        {`Start: ${new Date(consultation.startTime).toLocaleString()}`}
      </p>
      <p className="text-sm mb-2 text-gray-600">
        <FaCalendarAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
        {`End: ${new Date(consultation.endTime).toLocaleString()}`}
      </p>
      <p className="text-sm mb-2 text-gray-600">
        <FaUserAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
        {`Doctor: ${doctorName}`}
      </p>
      <a
        href={consultation.meetingLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm mb-2 text-blue-500 hover:text-blue-700 underline"
      >
        <FaLink className="inline-block h-4 w-4 mr-1 text-gray-400" />
        Join Meeting
      </a>
    </div>
  );
};

export default MyConsultationsPage;
