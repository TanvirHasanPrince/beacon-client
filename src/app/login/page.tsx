"use client";

import { useForm } from "react-hook-form";
import { useMemberLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Email = string;
type Password = string;

interface FormData {
  email: Email;
  password: Password;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [memberLogin] = useMemberLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await memberLogin(data);

      if (response.data.success) {
        const token = response.data.data.token;
        storeUserInfo({ token });
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center flex-col p-8 mt-8"
      >
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500">Please enter a valid email address</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500">Please enter your password</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <Link className="m-auto w-full mt-12" href={"/member/signup"}>
          <button className="py-4 px-10 bg-red-700 text-white">
            Not a member yet? Signup
          </button>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
