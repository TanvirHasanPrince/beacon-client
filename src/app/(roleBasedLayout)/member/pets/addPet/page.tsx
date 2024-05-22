"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useAddPetMutation } from "@/redux/api/petApi";
import { getUserInfo } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { ENUM_OF_PET_SPECIES } from "@/enums/sharedEnums";
import {
  tailwindButtonClass,
  tailwindPageTitleClass,
} from "@/components/tailwindClasses";
import { useRouter } from "next/navigation";

const AddPetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [addPetMutation, { isLoading, isError, error }] = useAddPetMutation();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    const rawImage = data.photo[0];
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
      data.photo = imageData.secure_url;

      const { userId } = getUserInfo() as any;
      data.memberId = userId;

      const response = await addPetMutation(data);

      toast.success(`Pet added successfully!`);
      router.push("/member/myProfile");
      reset();
    } catch (error) {
      toast.error("Could not add pet");
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-12">
      <h1 className={`${tailwindPageTitleClass}`}>Add Pet</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col w-full max-w-md"
      >
        <div className="mb-4 w-full">
          <label className={`block mb-2`}>Pet Name</label>
          <input
            type="text"
            {...register("petName", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.petName && (
            <p className="text-red-500">Pet Name is required</p>
          )}
        </div>

        <div className="mb-4 w-full">
          <label className="block mb-2">Species</label>
          <select
            {...register("species", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            {/* Map over the values of the ENUM_OF_COUNTRIES enum to generate options */}
            {Object.values(ENUM_OF_PET_SPECIES).map((spcy) => (
              <option key={spcy} value={spcy}>
                {spcy}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Age</label>
          <input
            type="text"
            {...register("age", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.age && <p className="text-red-500">Age is required</p>}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {errors.photo && (
            <p className="text-red-500">Please upload a photo for the pet.</p>
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

export default AddPetPage;
