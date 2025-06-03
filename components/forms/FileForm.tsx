/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { FaHashtag, FaBook, FaAlignLeft, FaUpload, FaTimes } from "react-icons/fa";

const FileForm = () => {
  const [fileData, setFileData] = useState({
    fileCode: "",
    courseCode: "",
    fileName: "",
    fileDescription: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !fileData.courseCode ||
      !fileData.fileCode ||
      !fileData.fileDescription ||
      !fileData.fileName ||
      !selectedFile
    ) {
      setError("Please fill in all required fields and select a file.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('fileCode', fileData.fileCode);
      formData.append('courseCode', fileData.courseCode);
      formData.append('fileName', fileData.fileName);
      formData.append('fileDescription', fileData.fileDescription);

      await axios.post("/api/admin/files/new", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess("File uploaded successfully!");
      setTimeout(() => {
        setSuccess("");
        setFileData({
          fileCode: "",
          courseCode: "",
          fileName: "",
          fileDescription: "",
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to upload file. Please try again."
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Code */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaHashtag className="mr-2 text-primary" />
              File Code (Required)
            </label>
            <input
              type="text"
              placeholder="FILE101"
              value={fileData.fileCode}
              onChange={(e) => setFileData({ ...fileData, fileCode: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaHashtag className="mr-2 text-primary" />
              Course Code (Required)
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={fileData.courseCode}
              onChange={(e) => setFileData({ ...fileData, courseCode: e.target.value })}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course: any) => (
                <option key={course._id} value={course.courseCode}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Name */}
        <div>
          <label className="text-sm font-medium text-text mb-1 flex items-center">
            <FaBook className="mr-2 text-primary" />
            File Name (Required)
          </label>
          <input
            type="text"
            placeholder="Lecture 1 - Introduction"
            value={fileData.fileName}
            onChange={(e) => setFileData({ ...fileData, fileName: e.target.value })}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* File Description */}
        <div>
          <label className="text-sm font-medium text-text mb-1 flex items-center">
            <FaAlignLeft className="mr-2 text-primary" />
            File Description (Required)
          </label>
          <textarea
            rows={4}
            placeholder="Brief description about the file..."
            value={fileData.fileDescription}
            onChange={(e) =>
              setFileData({ ...fileData, fileDescription: e.target.value })
            }
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="text-sm font-medium text-text mb-1 flex items-center">
            <FaUpload className="mr-2 text-primary" />
            File Upload (Required - PDF only)
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
                required
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

        {/* Submit + Cancel Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <Link
          href="/admin/dashboard/files"
            className="px-4 py-2 border border-gray-300 rounded-lg text-text hover:bg-background-secondary"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileForm;