/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaSmile,
  FaDonate,
  FaHandsHelping,
  FaPenFancy,
  FaHeart,
  FaRandom,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

interface Habit {
  id: number;
  name: string;
  weight: number;
  completed: boolean;
}

interface Params {
  date: string;
}

const HabitList: React.FC<{ params: Params }> = ({ params }) => {
  const { date } = params;
  const router = useRouter(); // Initialize router
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Compliment a stranger", weight: 30, completed: false },
    { id: 2, name: "Donate to a Local Charity", weight: 20, completed: false },
    { id: 3, name: "Help a Neighbor", weight: 50, completed: false },
    { id: 4, name: "Write a Thank-You Note", weight: 40, completed: false },
    { id: 5, name: "Volunteer", weight: 30, completed: false },
    { id: 6, name: "Random Acts of Kindness", weight: 25, completed: false },
  ]);
  const [redDates, setRedDates] = useState<string[]>([]);

  useEffect(() => {
    const storedRedDates = localStorage.getItem("redDates");
    if (storedRedDates) {
      setRedDates(JSON.parse(storedRedDates));
    }
  }, []);

  const handleHabitChange = (id: number) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);

    const allCompleted = updatedHabits.every((habit) => habit.completed);
    if (allCompleted) {
      toast.success("All challenges completed!");
      setTimeout(() => {
        router.push("/member/kindnessChallenge");
      }, 2000); // Redirect after 2 seconds
    }
  };

  const calculateCompletion = () => {
    const totalWeight = habits.reduce((acc, habit) => acc + habit.weight, 0);
    const completedWeight = habits
      .filter((habit) => habit.completed)
      .reduce((acc, habit) => acc + habit.weight, 0);
    return (completedWeight / totalWeight) * 100;
  };

  useEffect(() => {
    const completion = calculateCompletion();
    if (completion >= 50) {
      if (!redDates.includes(date)) {
        const updatedRedDates = [...redDates, date];
        setRedDates(updatedRedDates);
        localStorage.setItem("redDates", JSON.stringify(updatedRedDates));
      }
    } else {
      if (redDates.includes(date)) {
        const updatedRedDates = redDates.filter((d) => d !== date);
        setRedDates(updatedRedDates);
        localStorage.setItem("redDates", JSON.stringify(updatedRedDates));
      }
    }
  }, [habits]);

  const getIcon = (habitName: string) => {
    switch (habitName) {
      case "Compliment a stranger":
        return <FaSmile className="text-white" />;
      case "Donate to a Local Charity":
        return <FaDonate className="text-white" />;
      case "Help a Neighbor":
        return <FaHandsHelping className="text-white" />;
      case "Write a Thank-You Note":
        return <FaPenFancy className="text-white" />;
      case "Volunteer":
        return <FaHeart className="text-white" />;
      case "Random Acts of Kindness":
        return <FaRandom className="text-white" />;
      default:
        return null;
    }
  };

  const getIconBgColor = (habitName: string) => {
    switch (habitName) {
      case "Compliment a stranger":
        return "bg-yellow-500";
      case "Donate to a Local Charity":
        return "bg-red-500";
      case "Help a Neighbor":
        return "bg-green-500";
      case "Write a Thank-You Note":
        return "bg-blue-500";
      case "Volunteer":
        return "bg-purple-500";
      case "Random Acts of Kindness":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <Toaster /> {/* Add the Toaster component */}
      <h1 className="text-center text-2xl font-bold mb-4 text-gray-800">
        Kindness Challenges
      </h1>
      <ul className="space-y-4">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className={`flex items-center p-4 rounded-lg ${
              habit.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div
              className={`habit-icon w-10 h-10 rounded-full flex items-center justify-center ${getIconBgColor(
                habit.name
              )}`}
            >
              {getIcon(habit.name)}
            </div>
            <span
              className={`ml-3 text-lg flex-1 ${
                habit.completed ? "text-gray-500 line-through" : "text-gray-800"
              }`}
            >
              {habit.name}
            </span>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => handleHabitChange(habit.id)}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
