"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Calendar = () => {
  const router = useRouter();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [redDates, setRedDates] = useState<string[]>([]);

  useEffect(() => {
    // Load red dates from localStorage
    const storedRedDates = localStorage.getItem("redDates");
    if (storedRedDates) {
      setRedDates(JSON.parse(storedRedDates));
    }
  }, []);

  const handleDateClick = (date: number) => {
    const selectedDate = new Date(currentYear, currentMonth, date, 12, 0, 0);
    const formattedDate = selectedDate.toISOString().split("T")[0];

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
      if (prevMonth === 11) {
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
  const blanks = Array.from({ length: startDay }, () => "");
  const daysWithBlanks = [...blanks, ...days];

  const today = new Date().getDate();
  const currentFormattedDate = `${currentYear}-${String(
    currentMonth + 1
  ).padStart(2, "0")}`;

  return (
    <div className="flex items-center mt-12 justify-center p-6">
      <div className="w-full max-w-md rounded-3xl shadow-xl overflow-hidden border-2 border-green-300">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 rounded-md bg-red-100 text-gray-600 hover:bg-gray-300 border-2 border-green-300"
                onClick={handlePrevMonth}
              >
                Prev
              </button>
              <button
                className="px-3 py-1 rounded-md bg-red-100 text-gray-600 hover:bg-gray-300 border-2 border-green-300"
                onClick={handleNextMonth}
              >
                Next
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 ">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}
            {daysWithBlanks.map((day, index) => (
              <div
                key={index}
                className={`flex items-center justify-center text-center h-10 w-10 rounded-full border-green-200 border-2 cursor-pointer transition-all ${
                  day === "" ? "opacity-50 cursor-default" : "hover:bg-gray-200"
                } ${
                  day === today &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()
                    ? "bg-red-500 text-white"
                    : ""
                } ${
                  day !== "" &&
                  redDates.includes(
                    `${currentFormattedDate}-${String(day).padStart(2, "0")}`
                  )
                    ? "bg-teal-500 text-white"
                    : ""
                }`}
                onClick={() => day !== "" && handleDateClick(Number(day))}
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
