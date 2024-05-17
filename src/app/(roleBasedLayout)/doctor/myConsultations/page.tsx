"use client";
import { useDoctorQuery } from "@/redux/api/doctorApi";
import { useMemberQuery } from "@/redux/api/memberApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaUserAlt, FaLink } from "react-icons/fa";

const DoctorConsultationsPage = () => {
  const { userId } = getUserInfo() as any;
  const {
    data: doctorData,
    isLoading: isLoadingDoctor,
    isError: isErrorDoctor,
  } = useDoctorQuery(userId);

  if (isLoadingDoctor) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (isErrorDoctor || !doctorData) {
    return <div>Error occurred while fetching data.</div>; // Render error state if data fetching fails
  }

  const { consultations } = doctorData.data;

  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={"/doctor/consultations/createConsultation"}>
        <button className="bg-red-500 py-2 px-8 text-white mb-4">
          Add Consultation
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
    data: memberData,
    isLoading: isLoadingMember,
    isError: isErrorMember,
  } = useMemberQuery(consultation.memberId);

  if (isLoadingMember) {
    return <div>Loading member info...</div>; // Render loading state while fetching member data
  }

  if (isErrorMember || !memberData) {
    return <div>Error occurred while fetching member info.</div>; // Render error state if member data fetching fails
  }

  const { firstName, middleName, lastName } = memberData.data;
  const memberName = [firstName, middleName, lastName]
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
        {`Member: ${memberName}`}
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

export default DoctorConsultationsPage;
