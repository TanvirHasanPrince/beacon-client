// components/LoginForm.js
import React from "react";

const LoginForm = () => {
  return (
    <form className=" flex justify-center items-center flex-col p-8  mt-8">
      <div>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
