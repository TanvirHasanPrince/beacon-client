"use client";
import { useAddDoctorMutation } from "@/redux/api/doctorApi"; // Import the doctor API hook
import React from "react";
import { useForm } from "react-hook-form";
import "../../../../helpers/envConfig";
import {
  ENUM_DAYS_OF_WEEK,
  ENUM_OF_COUNTRIES,
  ENUM_OF_DOCTOR_AFFILIATION,
  ENUM_OF_DOCTOR_SPECIALIZATION,
} from "@/enums/sharedEnums";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { tailwindButtonClass } from "@/components/tailwindClasses";

const DoctorSignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addDoctorMutation, { isLoading, isError, error }] =
    useAddDoctorMutation();

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
    const rawImage = data.profilePhoto[0];
    const formData = new FormData();
    formData.append("file", rawImage);
    formData.append("upload_preset", "beaconPreset");

    try {
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imageData = await uploadResponse.json();
      data.profilePhoto = imageData.secure_url;

      // Upload cover photo
      const coverPhotoUrl = await uploadToCloudinary(data.coverPhoto[0]);
      data.coverPhoto = coverPhotoUrl;

      // Upload verification documents
      const verificationDocuments = Array.from(data.verificationDocuments);
      const verificationDocumentsUrls = [];

      for (const file of verificationDocuments) {
        if (file instanceof Blob) {
          formData.append("file", file);
          const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
            { method: "POST", body: formData }
          );

          if (!uploadResponse.ok) {
            throw new Error("Verification document upload failed");
          }

          const fileData = await uploadResponse.json();
          verificationDocumentsUrls.push(fileData.secure_url);
          formData.delete("file"); // Remove the previous file from the formData
        } else {
          console.error("Invalid file type:", file);
        }
      }

      data.verificationDocuments = verificationDocumentsUrls;

      const response = await addDoctorMutation(data);
      if (response) {
        toast.success("Registration Successful");
        router.push("/login");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Doctor Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col w-full max-w-md"
      >
        {/* Input fields based on the doctor model */}
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
            {...register("middleName", { required: false })}
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
            {...register("country", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {/* Map over the values of the ENUM_OF_COUNTRIES enum to generate options */}
            {Object.values(ENUM_OF_COUNTRIES).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Affiliation</label>
          <select
            {...register("affiliation", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {/* Map over the values of the ENUM_OF_DOCTOR_AFFILIATION enum to generate options */}
            {Object.values(ENUM_OF_DOCTOR_AFFILIATION).map((affiliation) => (
              <option key={affiliation} value={affiliation}>
                {affiliation}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Specializations</label>
          <select
            {...register("specializations", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {/* Map over the values of the ENUM_OF_DOCTOR_SPECIALIZATION enum to generate options */}
            {Object.values(ENUM_OF_DOCTOR_SPECIALIZATION).map(
              (specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              )
            )}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">License Number</label>
          <input
            type="text"
            {...register("licenseNumber", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.licenseNumber && (
            <p className="text-red-500">License Number is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Verification Documents</label>
          <input
            type="file"
            {...register("verificationDocuments", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            multiple
          />
          {errors.verificationDocuments && (
            <span className="text-red-500">
              Please upload verification documents.
            </span>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Availability</label>
          <select
            {...register("availability", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            multiple // enable multiple selection
          >
            {/* Map over the values of the ENUM_DAYS_OF_WEEK enum to generate options */}
            {Object.values(ENUM_DAYS_OF_WEEK).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Work Experience</label>
          <textarea
            {...register("workExperience", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.workExperience && (
            <p className="text-red-500">Work Experience is required</p>
          )}
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
          <button type="submit" className={`${tailwindButtonClass}`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorSignUpPage;
