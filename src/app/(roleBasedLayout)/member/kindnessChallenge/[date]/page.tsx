"use client";
import React, { useState, useEffect } from "react";

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

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Exercise", weight: 30, completed: false },
    { id: 2, name: "Read a Book", weight: 20, completed: false },
    { id: 3, name: "Meditate", weight: 50, completed: false },
  ]);

  const handleHabitChange = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
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
    if (completion >= 75) {
      // Update the calendar state to mark the date as green
      // This can be done via a global state or localStorage
    }
  }, [habits]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg ">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Habits for {date}
      </h1>
      <ul className="space-y-4">
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center">
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => handleHabitChange(habit.id)}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded"
            />
            <span
              className={`ml-3 text-lg ${
                habit.completed ? "text-gray-500 line-through" : "text-gray-800"
              }`}
            >
              {habit.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
