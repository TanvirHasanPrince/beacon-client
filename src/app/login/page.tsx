"use client";
import React, { useState } from "react";
import { useMemberLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
// Import the storeUserInfo function

const LoginForm = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [memberLogin, { isLoading }] = useMemberLoginMutation();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await memberLogin({ email, password }); // Call the login mutation with email and password

      const token = response.data.token; // Assuming the token is returned in the response

      if (!token) {
        console.log(`Token not found`);
      }

      // Store the token in local storage
      storeUserInfo({ token });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex justify-center items-center flex-col p-8 mt-8"
    >
      <div>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          change
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
