"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "../logo/Logo";
import Cookies from "js-cookie";

function SignInClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ ...errors, general: "" });

    try {
      const response = await fetch(`http://localhost:3001/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      if (data.token) {
        Cookies.set("token", data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        router.push("/");
      }
      router.push("/");
    } catch (error: any) {
      setErrors({
        ...errors,
        general: error.message || "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-[450px] rounded-xl p-8 shadow-2xl">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <Logo />
            </div>
          </div>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <h1 className="font-bold text-[32px] leading-[36px] tracking-[1.14px] uppercase mb-2 text-center text-[#0E0E0E]">
          Sign In
        </h1>
        <p className="text-center text-gray-600 mb-8 font-medium text-[14px]">
          Welcome back! Please sign in to your account
        </p>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase text-[#0E0E0E]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full h-[56px] px-4 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } hover:border-gray-400 font-bold text-[14px] leading-[100%] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
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
                <p className="text-red-700 text-[12px]">{errors.email}</p>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase text-[#0E0E0E]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full h-[56px] px-4 pr-12 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } hover:border-gray-400 font-bold text-[14px] leading-[100%] tracking-[-0.25px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
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
                    width="20"
                    height="20"
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
                <p className="text-red-700 text-[12px]">{errors.password}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] cursor-pointer bg-[#D87D4A] hover:bg-[#FBAF85] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-[13px] leading-[100%] tracking-[1px] uppercase rounded-xl transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium text-[14px]">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/sign-up")}
              className="font-bold text-[#D87D4A] hover:text-[#FBAF85] transition-colors duration-300 uppercase tracking-[0.5px] cursor-pointer hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
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

export default SignInClient;
