"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "../logo/Logo";

const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  lastName: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  email: yup.string().required("Can't be empty").email("It must be an e-mail"),
  password: yup
    .string()
    .required("Can't be empty")
    .min(8, "Minimum 8 characters")
    .max(20, "Maximum 20 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must include uppercase, lowercase and number"
    ),
  country: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  city: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
});

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city: string;
};

function SignUpClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Sign up failed");
      }

      router.push("/sign-in");
    } catch (error: any) {
      if (error.message == "user already exist") {
        setServerError(error.message);
      } else alert(error.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-[550px] rounded-xl p-8 shadow-2xl">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <Logo />
            </div>
          </div>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <h1 className="font-bold text-[28px] leading-[32px] tracking-[1px] uppercase mb-2 text-center text-[#0E0E0E]">
          Sign Up
        </h1>
        <p className="text-center text-gray-600 mb-6 font-medium text-[14px]">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-[12px] font-bold uppercase tracking-[-0.21px] text-[#0E0E0E]"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                placeholder="First name"
                className={`w-full h-[52px] px-4 rounded-xl border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } hover:border-gray-400 font-bold text-[14px] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
              />
              {errors.firstName && (
                <div className="flex items-center mt-2 gap-[6px]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#DC2626" />
                    <path
                      d="M6 3v3m0 2h.01"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-red-700 text-[12px]">
                    {errors.firstName.message}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-[12px] font-bold uppercase tracking-[-0.21px] text-[#0E0E0E]"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                placeholder="Last name"
                className={`w-full h-[52px] px-4 rounded-xl border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } hover:border-gray-400 font-bold text-[14px] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
              />
              {errors.lastName && (
                <div className="flex items-center mt-2 gap-[6px]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#DC2626" />
                    <path
                      d="M6 3v3m0 2h.01"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-red-700 text-[12px]">
                    {errors.lastName.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-[12px] font-bold uppercase tracking-[-0.21px] text-[#0E0E0E]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="text"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full h-[52px] px-4 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } hover:border-gray-400 font-bold text-[14px] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
            />
            {errors.email && (
              <div className="flex items-center mt-2 gap-[6px]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="6" r="6" fill="#DC2626" />
                  <path
                    d="M6 3v3m0 2h.01"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-red-700 text-[12px]">
                  {errors.email.message}
                </p>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-[12px] font-bold uppercase tracking-[-0.21px] text-[#0E0E0E]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Create a password"
                className={`w-full h-[52px] px-4 pr-12 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } hover:border-gray-400 font-bold text-[14px] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center mt-2 gap-[6px]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="6" r="6" fill="#DC2626" />
                  <path
                    d="M6 3v3m0 2h.01"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-red-700 text-[12px]">
                  {errors.password.message}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-[12px] font-bold uppercase tracking-[-0.21px] text-[#0E0E0E]"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                {...register("country")}
                placeholder="Country"
                className={`w-full h-[52px] px-4 rounded-xl border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } hover:border-gray-400 font-bold text-[14px] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
              />
              {errors.country && (
                <div className="flex items-center mt-2 gap-[6px]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#DC2626" />
                    <path
                      d="M6 3v3m0 2h.01"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-red-700 text-[12px]">
                    {errors.country.message}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-[12px] font-bold uppercase tracking-[-0.21px] text-[#0E0E0E]"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                {...register("city")}
                placeholder="City"
                className={`w-full h-[52px] px-4 rounded-xl border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } hover:border-gray-400 font-bold text-[14px] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
              />
              {errors.city && (
                <div className="flex items-center mt-2 gap-[6px]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#DC2626" />
                    <path
                      d="M6 3v3m0 2h.01"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-red-700 text-[12px]">
                    {errors.city.message}
                  </p>
                </div>
              )}
            </div>
          </div>
          {serverError && (
            <div className="flex items-center mt-2 gap-[6px]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6" cy="6" r="6" fill="#DC2626" />
                <path
                  d="M6 3v3m0 2h.01"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-red-700 text-[12px]">{serverError}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer h-[48px] bg-[#D87D4A] hover:bg-[#FBAF85] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-[13px] leading-[100%] tracking-[1px] uppercase rounded-xl transition-all duration-300 flex items-center justify-center mt-6"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-gray-600 font-medium text-[14px]">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/sign-in")}
              className="font-bold text-[#D87D4A] hover:text-[#FBAF85] transition-colors duration-300 uppercase tracking-[0.5px] cursor-pointer hover:underline"
            >
              Sign In
            </button>
          </p>

          <button
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-gray-700 font-medium text-[12px] uppercase tracking-[1px] cursor-pointer hover:underline transition-colors duration-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpClient;
