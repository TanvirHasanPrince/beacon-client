"use client";
import { useJournalEntryQuery } from "@/redux/api/journalApi";
import React from "react";
import imageTest from "../../../../../../assets/HomePage/A_group_of_diverse_friends_standing_on_a_cliff.jpg";
import Image from "next/image";

interface IParams {
  id: string;
}

const MyJournalDetailsPage = ({ params }: { params: IParams }) => {
  const { id: journalId } = params;
  const {
    data: journalData,
    isLoading,
    isError,
  } = useJournalEntryQuery(journalId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError || !journalData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Error occurred while fetching data.
        </p>
      </div>
    );
  }

  const { title, date, content, mood, tags, journalPhoto } = journalData.data;

  return (
    <div className="max-w-3xl mx-auto p-8 ">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(date).toLocaleDateString()}
      </p>
      <Image src={journalPhoto} width={500} height={500} alt="none"></Image>

      <p className="text-gray-700 mb-6">{content}</p>

      <div className="flex items-center mb-4">
        <span className="text-gray-800 font-semibold mr-2">Mood:</span>
        <span className="text-pink-600">{mood}</span>
      </div>

      {tags && (
        <div>
          <h2 className="text-gray-800 font-semibold mb-2">Tags:</h2>
          <div className="flex flex-wrap">
            {tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 text-pink-600 px-2 py-2 rounded-xl mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJournalDetailsPage;
