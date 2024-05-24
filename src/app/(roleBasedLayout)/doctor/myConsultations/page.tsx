"use client";
import { useDoctorQuery } from "@/redux/api/doctorApi";
import { useMemberQuery } from "@/redux/api/memberApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaUserAlt, FaLink } from "react-icons/fa";
import Image from "next/image"; // Assuming you have images for members
import SentimentAnalysisChart from "@/components/ui/SentimentAnalysisChart";

const DoctorConsultationsPage = () => {
  const { userId } = getUserInfo() as any;
  const {
    data: doctorData,
    isLoading: isLoadingDoctor,
    isError: isErrorDoctor,
  } = useDoctorQuery(userId);

  if (isLoadingDoctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ); // Render loading state while fetching data
  }

  if (isErrorDoctor || !doctorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error occurred while fetching data.
      </div>
    ); // Render error state if data fetching fails
  }

  const { consultations } = doctorData.data;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Your Consultations
      </h1>

      <div className="mt-4 px-8 w-full max-w-3xl">
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
    return <div className="mb-8">Loading member info...</div>; // Render loading state while fetching member data
  }

  if (isErrorMember || !memberData) {
    return (
      <div className="mb-8">Error occurred while fetching member info.</div>
    ); // Render error state if member data fetching fails
  }

  const { firstName, middleName, lastName } = memberData.data;
  const memberName = [firstName, middleName, lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Link href={`/doctor/consultations/${consultation.id}`}>
        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-xl p-6 mb-8 w-full">
          <p className="text-xl mb-2 text-gray-600 font-semi-bold">
            {memberName}
          </p>
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col justify-start">
              <p className="text-sm mb-2 text-red-600 font-bold">
                {new Date(consultation.startTime).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
                {", "}
                {new Date(consultation.startTime).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {" - "}
                {new Date(consultation.endTime).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>

              <Link
                href={consultation.meetingLink}
                rel="noopener noreferrer"
                className="text-sm text-center mt-2"
              >
                <button className="py-2 px-8 bg-gradient-to-r from-violet-300 to-fuchsia-300 hover:bg-blue-600 text-black font-semibold rounded-md">
                  Join Meeting
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-full mt-4">
        <SentimentAnalysisChart memberId={memberData.data.id} />
      </div>
    </>
  );
};

export default DoctorConsultationsPage;
