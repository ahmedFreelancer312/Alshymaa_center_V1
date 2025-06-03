/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import {
  FaHashtag,
  FaBook,
  FaAlignLeft,
  FaCalendarAlt,
  FaSave,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

const AssignmentForm = () => {
  const [assignment, setAssignment] = useState({
    assignmentCode: "",
    courseCode: "",
    title: "",
    description: "",
    dueDate: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setErrorMessage("");
    setLoading(true);

    if (
      !assignment.assignmentCode ||
      !assignment.courseCode ||
      !assignment.title ||
      !assignment.description ||
      !assignment.dueDate
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      formData.append('assignmentCode', assignment.assignmentCode);
      formData.append('courseCode', assignment.courseCode);
      formData.append('title', assignment.title);
      formData.append('description', assignment.description);
      formData.append('dueDate', assignment.dueDate);

      await axios.post("/api/admin/assignments/new", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess("Assignment created successfully!");
      setTimeout(() => {
        setSuccess("");
        setAssignment({
          assignmentCode: "",
          courseCode: "",
          title: "",
          description: "",
          dueDate: "",
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to create assignment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/admin/courses");
        setCourses(data);
      } catch (error) {
        console.log("Error fetching courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assignment Code */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaHashtag className="mr-2 text-primary" />
              Assignment Code (Required)
            </label>
            <input
              type="text"
              placeholder="ASSIGN101"
              value={assignment.assignmentCode}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  assignmentCode: e.target.value,
                })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Course Code */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaBook className="mr-2 text-primary" />
              Course (Required)
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={assignment.courseCode}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  courseCode: e.target.value,
                })
              }
              required
            >
              <option value="">Select Course</option>
              {courses.map((course: any) => (
                <option key={course._id} value={course.courseCode}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        {/* Assignment Title */}
        <div>
          <label className="text-sm font-medium text-text mb-1 flex items-center">
            <FaBook className="mr-2 text-primary" />
            Assignment Title (Required)
          </label>
          <input
            type="text"
            placeholder="Programming Assignment 1"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-text mb-1 flex items-center">
            <FaAlignLeft className="mr-2 text-primary" />
            Description (Required)
          </label>
          <textarea
            rows={4}
            placeholder="Assignment instructions and requirements..."
            value={assignment.description}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                description: e.target.value,
              })
            }
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            required
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label className="text-sm font-medium text-text mb-1 flex items-center">
            <FaCalendarAlt className="mr-2 text-primary" />
            Due Date (Required)
          </label>
          <input
            type="datetime-local"
            value={assignment.dueDate}
            onChange={(e) =>
              setAssignment({ ...assignment, dueDate: e.target.value })
            }
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Assignment File Upload */}
        <div>
          <label className="text-sm font-medium text-text mb-1 flex items-center">
            <FaUpload className="mr-2 text-primary" />
            Assignment File (Optional - PDF only)
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300">
              Choose File
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf"
              />
            </label>
            {selectedFile && (
              <div className="flex items-center gap-2">
                <span className="text-sm">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
        </div>

        {/* Buttons */}
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
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center disabled:opacity-50"
          >
            <FaSave className="mr-2" />
            {loading ? "Creating..." : "Create Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentForm;