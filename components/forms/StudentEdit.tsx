/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import Loading from "../ui/loading";

const StudentEdit = () => {
  const params = useParams();
  const studentId = params?.id as string;

  const departments = ["Data Science", "Software Engineering", "Cybersecurity"];
  const faculties = ["Faculty of Engineering", "Faculty of Computer Science"];
  const academicLevels = ["1st Year", "2st Year", "3st Year", "4st Year"];

  const [student, setStudent] = useState({
    academicId: "",
    name: "",
    department: "",
    faculty: "",
    academicLevel: "",
    phone: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`/api/admin/students/${studentId}`);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    try {
      await axios.patch(`/api/admin/students/${studentId}`, student);
      setSuccess("Student updated successfully!");
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

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
          </div>
        </div>

        <div>
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
            href="/admin/dashboard/students"
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
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentEdit;
