// "use client";
// import { useAddMemberMutation } from "@/redux/api/memberApi";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "../../../helpers/envConfig";

// const MemberSignUpPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Using the useAddMemberMutation hook from Redux Toolkit
//   const [addMemberMutation, { isLoading, isError, error }] =
//     useAddMemberMutation();

//   const onSubmit = async (data) => {
//     console.log(data.profilePhoto[0]);
//     const rawImage = data.profilePhoto[0];

//     const formData = new FormData();
//     formData.append("file", rawImage);
//     formData.append("upload_preset", "beaconPreset"); // Corrected typo

//     try {
//       const uploadResponse = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!uploadResponse.ok) {
//         throw new Error(`Image upload failed`);
//       }

//       const imageData = await uploadResponse.json();
//       console.log(imageData.secure_url);

//       data.profilePhoto = imageData.secure_url;
//       // Call the addMemberMutation function with the form data
//       const response = await addMemberMutation(data);
//       console.log(response);
//       // Handle success response here
//     } catch (error) {
//       console.error("An error occurred:", error); // Handle error here
//     }
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-2xl font-semibold mt-8 mb-4">Member Sign Up</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
//         <div className="mb-4">
//           <label className="block mb-2">First Name</label>
//           <input
//             type="text"
//             {...register("firstName", { required: true })}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//           {errors.firstName && (
//             <p className="text-red-500">First Name is required</p>
//           )}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Middle Name</label>
//           <input
//             type="text"
//             {...register("middleName")}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Last Name</label>
//           <input
//             type="text"
//             {...register("lastName", { required: true })}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//           {errors.lastName && (
//             <p className="text-red-500">Last Name is required</p>
//           )}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Email</label>
//           <input
//             type="email"
//             {...register("email", { required: true })}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//           {errors.email && <p className="text-red-500">Email is required</p>}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Mobile</label>
//           <input
//             type="tel"
//             {...register("mobile")}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Password</label>
//           <input
//             type="password"
//             {...register("password", { required: true })}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//           {errors.password && (
//             <p className="text-red-500">Password is required</p>
//           )}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Country</label>
//           <input
//             type="text"
//             {...register("country")}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Interest</label>
//           <select
//             {...register("interest")}
//             multiple
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           >
//             <option value="Football">Football</option>
//             <option value="Gardening">Gardening</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Bio</label>
//           <textarea
//             {...register("bio")}
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2" htmlFor="profilePhoto">
//             Profile Photo
//           </label>
//           <input
//             type="file"
//             {...register("profilePhoto", { required: true })}
//             id="profilePhoto"
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
//           />
//           {errors.profilePhoto && (
//             <span className="text-red-500">Please upload a profile photo.</span>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MemberSignUpPage;
