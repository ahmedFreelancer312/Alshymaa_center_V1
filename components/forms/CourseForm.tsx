/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaBook, FaHashtag, FaChalkboardTeacher, FaSave } from "react-icons/fa";

const CourseForm = () => {
  const departments = ["Data Science", "Software Engineering", "Cybersecurity"];
  const instructors = [
    "Dr. Ahmed Mohamed",
    "Dr. Salma Mostafa",
    "Dr. Hossam Refaat",
  ];
  const faculty = ["Faculty of Engineering", "Faculty of Computer Science"];
  const academicLevels = ["1st Year", "2st Year", "3st Year", "4st Year"];

  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    instructor: "",
    faculty: "",
    academicLevel: "",
    description: "",
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
      !course.courseCode ||
      !course.courseName ||
      !course.department ||
      !course.instructor
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
    }
    try {
      await axios.post("/api/admin/courses/new", course);
      setSuccess("Course added successfully!");
      setTimeout(() => {
        setSuccess("");
        setCourse({
          courseCode: "",
          courseName: "",
          department: "",
          instructor: "",
          faculty: "",
          academicLevel: "",
          description: "",
        });
      }, 3000);
    } catch (error: any) {
      setErrorMessage(
        error.response.data.message ||
          "Failed to add course check your data and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Code */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaHashtag className="mr-2 text-primary" />
              Course Code (Required)
            </label>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="CS201"
              value={course.courseCode}
              onChange={(e) =>
                setCourse({ ...course, courseCode: e.target.value })
              }
              //   required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Course Name */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaBook className="mr-2 text-primary" />
              Course Name (Required)
            </label>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Data Structures"
              //   required
              value={course.courseName}
              onChange={(e) =>
                setCourse({ ...course, courseName: e.target.value })
              }
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Department (Required)
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              //   required
              value={course.department}
              onChange={(e) =>
                setCourse({ ...course, department: e.target.value })
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

          {/* Instructor */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaChalkboardTeacher className="mr-2 text-primary" />
              Instructor (Required)
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              //   required
              value={course.instructor}
              onChange={(e) =>
                setCourse({ ...course, instructor: e.target.value })
              }
            >
              <option value="">Select Instructor</option>
              {instructors.map((instructor, i) => (
                <option key={i} value={instructor}>
                  {instructor}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* faculty */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              faculty
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              //   required
              value={course.faculty}
              onChange={(e) =>
                setCourse({ ...course, faculty: e.target.value })
              }
            >
              <option value="">Select faculty</option>
              {faculty.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Instructor */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaChalkboardTeacher className="mr-2 text-primary" />
              academic Level
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              //   required
              value={course.academicLevel}
              onChange={(e) =>
                setCourse({ ...course, academicLevel: e.target.value })
              }
            >
              <option value="">Select academic Level</option>
              {academicLevels.map((instructor, i) => (
                <option key={i} value={instructor}>
                  {instructor}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Course Description
          </label>
          <textarea
            rows={4}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Enter course description..."
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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

export default CourseForm;
