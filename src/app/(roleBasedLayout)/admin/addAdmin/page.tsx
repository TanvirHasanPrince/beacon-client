"use client";
import { useAddAdminMutation } from "@/redux/api/adminApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddAdminPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addAdminMutation, { isLoading, isError, error }] =
    useAddAdminMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await addAdminMutation(data);
      console.log(response);

      toast.success(`Admin created successfully`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Admin Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col w-full max-w-md"
      >
        <div className="mb-4 w-full">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-500">First Name is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Middle Name</label>
          <input
            type="text"
            {...register("middleName")}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500">Last Name is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Mobile</label>
          <input
            type="tel"
            {...register("mobile")}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>
        <div className="flex justify-center ">
          <button
            type="submit"
            className="mt-2 mb-8 bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-28 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminPage;
