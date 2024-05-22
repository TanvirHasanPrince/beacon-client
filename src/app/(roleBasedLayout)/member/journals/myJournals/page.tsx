"use client";
import React from "react";
import { getUserInfo } from "@/services/auth.service";
import { useMemberQuery } from "@/redux/api/memberApi";
import { tailwindPageTitleClass } from "@/components/tailwindClasses";
import testImage from "../../../../../assets/HomePage/A_group_of_diverse_friends_standing_on_a_cliff.jpg";
import Image from "next/image";

const MyJournalsPage = () => {
  const { userId } = getUserInfo() as any;
  const { data: memberData, isLoading, isError } = useMemberQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (isError || !memberData) {
    return <div>Error occurred while fetching data.</div>; // Render error state if data fetching fails
  }

  const { journals } = memberData.data;

  return (
    <div>
      <div className="relative max-w-4xl mx-auto p-8 bg-opacity-80 ">
        <h1 className={`${tailwindPageTitleClass} text-center mb-4`}>
          My Journals
        </h1>
        {journals.map((journal: any) => (
          <div
            key={journal.id}
            className="flex flex-col items-start justify-center border border-gray-300 rounded-lg p-4 mb-4 w-full max-w-3xl bg-[#e0f7fa] shadow-md transform hover:scale-105 hover:translate-y-2 transition-all duration-1000"
          >
            <div className="flex items-center mb-2 ">
              <div className="text-2xl font-bold  mr-1 text-pink-600">
                {new Date(journal.date).getDate()}
              </div>
              <div className="text-lg text-pink-600 mr-1">
                {new Date(journal.date).toLocaleString("default", {
                  month: "short",
                })}
              </div>
              <div className="text-lg text-pink-600">
                {new Date(journal.date).getFullYear()}
              </div>
            </div>
            <h3 className="text-md font-semibold mb-1 text-gray-800">
              {journal.title}
            </h3>
            <p className="text-sm text-gray-600">
              {journal.content.slice(0, 100)}
              {journal.content.length > 100 ? "..." : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJournalsPage;
