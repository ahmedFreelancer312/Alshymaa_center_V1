/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  FaUser,
  FaIdCard,
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const RegisterStudentForm = () => {
  const departments = ["Data Science", "Software Engineering", "Cybersecurity"];
  const faculties = ["Faculty of Engineering", "Faculty of Computer Science"];
  const academicLevels = ["1st Year", "2st Year", "3st Year", "4st Year"];

  const [student, setStudent] = useState({
    name: "",
    academicId: "",
    password: "",
    faculty: "",
    department: "",
    academicLevel: "",
    phone: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !student.name ||
      !student.academicId ||
      !student.faculty ||
      !student.department ||
      !student.password
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
    }
    try {
      await axios.post("/api/admin/students/new", student);
      setSuccess("Student added successfully!");
      setTimeout(() => {
        setSuccess("");
        setStudent({
          name: "",
          academicId: "",
          password: "",
          faculty: "",
          department: "",
          academicLevel: "",
          phone: "",
          status: "",
        });
      }, 4000);
      setError("");
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ||
          "Failed to add student check your data and try again."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
    setLoading(false);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* University ID */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaIdCard className="mr-2 text-primary" />
              University ID (Required)
            </label>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="123456789"
              required
              value={student.academicId}
              onChange={(e) =>
                setStudent({ ...student, academicId: e.target.value })
              }
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaUser className="mr-2 text-primary" />
              Full Name (Required)
            </label>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Ahmed Mohamed"
              required
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaGraduationCap className="mr-2 text-primary" />
              Department (Required)
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
              value={student.department}
              onChange={(e) =>
                setStudent({ ...student, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Faculty */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaUniversity className="mr-2 text-primary" />
              Faculty (Required)
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
              value={student.faculty}
              onChange={(e) =>
                setStudent({ ...student, faculty: e.target.value })
              }
            >
              <option value="">Select Faculty</option>
              {faculties.map((faculty, i) => (
                <option key={i} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Level */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaCalendarAlt className="mr-2 text-primary" />
              Academic Level
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={student.academicLevel}
              onChange={(e) =>
                setStudent({ ...student, academicLevel: e.target.value })
              }
            >
              <option value="">Select Level</option>
              {academicLevels.map((level, i) => (
                <option key={i} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="+20 123 456 7890"
              value={student.phone}
              onChange={(e) =>
                setStudent({ ...student, phone: e.target.value })
              }
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaIdCard className="mr-2 text-primary" />
              Password (Required)
            </label>
            <input
              type="password"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="********"
              required
              value={student.password}
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaCalendarAlt className="mr-2 text-primary" />
              Status
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={student.status}
              onChange={(e) =>
                setStudent({ ...student, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Link
            href="/admin/students"
            className="px-4 py-2 border border-gray-300 rounded-lg text-text hover:bg-background-secondary"
          >
            Cancel
          </Link>
          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
          >
            <FaSave className="mr-2" />
            {loading ? "create..." : "create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStudentForm;
