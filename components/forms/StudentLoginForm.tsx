"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import Loading from "../ui/loading";

const LoginForm = () => {
  const [academicId , setAcademicId] = useState("")
  const [password , setPassword] = useState("")
  const router = useRouter()
  const [error , setError] = useState("")
  const [loading , setLoading] = useState(false)

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (!academicId || !password) {
      setError("Please fill all fields")
      setLoading(false);
      return
    }
    const res = await signIn("student-credentials" , {
      academicId,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/student/dashboard")
    }
    setLoading(false)

  }
  return (
    <>
      {/* Login Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handelSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-text mb-1"
            >
              Academic ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter your university ID"
                value={academicId}
                onChange={(e) => setAcademicId(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Login Button */}
          <div className="pt-2">
            {loading ? (
              <div className="flex justify-center mt-2">
                <Loading />
              </div>
            ) : (
              <button type="submit" className="w-full flex justify-center py-2 px-4 cursor-pointer border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            
              Login
                </button>
            )}
          </div>
        </form>
      </div>

      {/* Footer Links */}
      <div className="mt-6 text-center text-sm">
        <p className="text-text-secondary">
          Forgot your password?{" "}
          <Link
            href="/login/reset-password"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Reset here
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
