"use client";
import React from "react";
import { FaCalendarAlt, FaTags, FaInfoCircle } from "react-icons/fa";
import { getUserInfo } from "@/services/auth.service";
import { useMemberQuery } from "@/redux/api/memberApi";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center">
      <Link href={"/member/journals/addJournal"}>
        <button className="bg-red-500 py-2 px-8 text-white mb-4">
          Add Journal
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-8 text-gray-800">My Journals</h1>
      <div className="p-8">
        {journals.map((journal: any) => (
          <div
            key={journal.id}
            className="flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-lg p-6 mb-8 w-full max-w-3xl"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {journal.title}
            </h3>
            <p className="text-sm mb-2 text-gray-600">
              <FaCalendarAlt className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {new Date(journal.date).toLocaleDateString()}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              <FaTags className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {journal.tags.join(", ")}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              <FaInfoCircle className="inline-block h-4 w-4 mr-1 text-gray-400" />
              {journal.content}
            </p>
            <p className="text-sm mb-2 text-gray-600">Mood: {journal.mood}</p>
            {/* Additional fields can be displayed similarly */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJournalsPage;
