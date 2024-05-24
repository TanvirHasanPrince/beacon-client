"use client";
import { useAddMemberMutation } from "@/redux/api/memberApi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import "../../../../helpers/envConfig";
import { ENUM_OF_COUNTRIES, ENUM_OF_INTERESTS } from "@/enums/sharedEnums";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Select, { ActionMeta, MultiValue } from "react-select";

const MemberSignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [addMemberMutation, { isLoading, isError, error }] =
    useAddMemberMutation();

  const router = useRouter();

  const uploadToCloudinary = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "beaconPreset");

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    const imageData = await uploadResponse.json();
    return imageData.secure_url;
  };

  const onSubmit = async (data: any) => {
    try {
      // Upload profile photo
      const profilePhotoUrl = await uploadToCloudinary(data.profilePhoto[0]);
      data.profilePhoto = profilePhotoUrl;

      // Upload cover photo
      const coverPhotoUrl = await uploadToCloudinary(data.coverPhoto[0]);
      data.coverPhoto = coverPhotoUrl;

      // Submit the form data with updated URLs
      const response = await addMemberMutation(data);
      reset();
      toast.success("Your account created successfully! Please login");

      router.push("/login");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const options = Object.values(ENUM_OF_INTERESTS).map((interest) => ({
    value: interest,
    label: interest,
  }));

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Member Sign Up</h1>
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
        <div className="mb-4 w-full">
          <label className="block mb-2">Country</label>
          <select
            {...register("country")}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {Object.values(ENUM_OF_COUNTRIES).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Interest</label>
          <Controller
            name="interest"
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
                  label: option, // Corrected 'lable' to 'label'
                }))}
              />
            )}
          />
        </div>

        <div className="mb-4 w-full">
          <label className="block mb-2">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="profilePhoto">
            Profile Photo
          </label>
          <input
            type="file"
            {...register("profilePhoto", { required: true })}
            id="profilePhoto"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.profilePhoto && (
            <span className="text-red-500">Please upload a profile photo.</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="coverPhoto">
            Cover Photo
          </label>
          <input
            type="file"
            {...register("coverPhoto", { required: true })}
            id="coverPhoto"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.coverPhoto && (
            <span className="text-red-500">Please upload a cover photo.</span>
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

export default MemberSignUpPage;
