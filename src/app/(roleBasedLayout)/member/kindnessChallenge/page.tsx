"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Calendar = () => {
  const router = useRouter();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleDateClick = (date: any) => {
    // Get the current year and month dynamically
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based, so January is 0, May is 4

    // Create a new date object using the provided date, set time to noon to avoid timezone issues
    const selectedDate = new Date(currentYear, currentMonth, date, 12, 0, 0);

    // Format the date as YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split("T")[0];

    // Log the selected date for debugging purposes
    // console.log(selectedDate);

    // Navigate to the new route with the formatted date
    router.push(`/member/kindnessChallenge/${formattedDate}`);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11; // December
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0; // January
      } else {
        return prevMonth + 1;
      }
    });
  };

  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => "");
  const daysWithBlanks = [...blanks, ...days];

  const today = new Date().getDate(); // get the current day of the month

  return (
    <div className="mt-12 flex items-center justify-center p-6">
      <div className="max-w-md mx-auto rounded-lg shadow-2xl overflow-hidden">
        <div className="px-2 py-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex items-center">
              <button
                className="px-2 py-1 rounded-md bg-red-200 hover:bg-gray-300"
                onClick={handlePrevMonth}
              >
                Prev
              </button>
              <button
                className="ml-2 px-2 py-1 rounded-md bg-red-200 hover:bg-gray-300"
                onClick={handleNextMonth}
              >
                Next
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-4 mt-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center font-bold text-gray-700">
                {day}
              </div>
            ))}
            {daysWithBlanks.map((day, index) => (
              <div
                key={index}
                className={`text-center p-2 border rounded-md cursor-pointer ${
                  day === "" ? "opacity-50" : ""
                } ${
                  day === today &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()
                    ? "bg-teal-500 text-white"
                    : ""
                }`}
                onClick={() => day !== "" && handleDateClick(day)}
              >
                {day !== "" ? day : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
