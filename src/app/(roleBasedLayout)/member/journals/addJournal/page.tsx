"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAddJournalEntryMutation } from "@/redux/api/journalApi";
import { getUserInfo } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { JOURNAL_MOOD_ENUM, JOURNAL_TYPE_TAGS_ENUM } from "@/enums/sharedEnums";
import { getSentiment } from "@/utils/getSentiment";
import Select, { ActionMeta, MultiValue } from "react-select";

import { tailwindButtonClass } from "@/components/tailwindClasses";
import { useRouter } from "next/navigation";

const AddJournalEntry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [addJournalEntry] = useAddJournalEntryMutation();
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    try {
      const { userId } = getUserInfo() as any;
      data.memberId = userId;

      // Determine sentiment of the content
      const sentimentResult = getSentiment(data.content);
      data.sentimentResult = sentimentResult.mood;

      console.log(data);

      await addJournalEntry(data);
      toast.success("Journal entry added successfully!");
      router.push("/member/journals/myJournals");
      reset();
    } catch (error) {
      toast.error("Could not add journal entry");
      console.error("An error occurred:", error);
    }
    setSubmitting(false);
  };

  // Assuming JOURNAL_TYPE_TAGS_ENUM is an object with tag values
  const options = Object.values(JOURNAL_TYPE_TAGS_ENUM).map((tag) => ({
    value: tag,
    label: tag,
  }));

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Add Journal Entry</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col w-full max-w-md"
      >
        <div className="mb-4 w-full">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            {...register("date", { required: true })}
            id="date"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.date && <p className="text-red-500">Date is required</p>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Content</label>
          <textarea
            {...register("content", { required: true })}
            placeholder="Content"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.content && (
            <p className="text-red-500">Content is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Mood</label>
          <select
            {...register("mood", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {Object.values(JOURNAL_MOOD_ENUM).map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
          {errors.mood && <p className="text-red-500">Mood is required</p>}
        </div>

        <div className="mb-4 w-full">
          <label className="block mb-2">Tags</label>
          <Controller
            name="tags"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                isMulti
                options={options}
                className="w-full"
                classNamePrefix="react-select"
                onChange={(
                  newValue: MultiValue<{ value: string; label: string }>
                ) => onChange(newValue.map((option) => option.value))}
                value={value?.map((option: string) => ({
                  value: option,
                  label: option,
                }))}
              />
            )}
          />
          {errors.tags && <p className="text-red-500">Tags are required</p>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Additional Info</label>
          <textarea
            {...register("additional_info")}
            placeholder="Additional Info"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`${tailwindButtonClass}`}
        >
          {submitting ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddJournalEntry;
