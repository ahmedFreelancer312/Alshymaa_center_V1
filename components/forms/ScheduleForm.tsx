/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  FaSave,
  FaChalkboardTeacher,
  FaBook,
  FaHashtag,
  FaClock,
  FaAlignLeft,
} from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function ScheduleForm() {
  const departments = ["Data Science", "Software Engineering", "Cybersecurity"];
  const faculty = ["Faculty of Engineering", "Faculty of Computer Science"];
  const academicLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const [schedule, setSchedule] = useState({
    meetingCode: "",
    meetingTitle: "",
    startTime: "",
    endTime: "",
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
      !schedule.meetingCode ||
      !schedule.meetingTitle ||
      !schedule.startTime ||
      !schedule.endTime ||
      !schedule.department ||
      !schedule.instructor ||
      !schedule.faculty ||
      !schedule.academicLevel
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
    }

    try {
      await axios.post("/api/admin/schedules/new", schedule);
      setSuccess("Meeting scheduled successfully!");
      setTimeout(() => {
        setSuccess("");
        setSchedule({
          meetingCode: "",
          meetingTitle: "",
          startTime: "",
          endTime: "",
          department: "",
          instructor: "",
          faculty: "",
          academicLevel: "",
          description: "",
        });
      }, 3000);
    } catch (error) {
      setErrorMessage(
          "Failed to schedule meeting, check your data and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meeting Code */}
            <div>
              <label className="text-sm font-medium text-text mb-1 flex items-center">
                <FaHashtag className="mr-2 text-primary" />
                Meeting Code
              </label>
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="CS201"
                value={schedule.meetingCode}
                onChange={(e) =>
                  setSchedule({ ...schedule, meetingCode: e.target.value })
                }
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Meeting Title */}
            <div>
              <label className="text-sm font-medium text-text mb-1 flex items-center">
                <FaBook className="mr-2 text-primary" />
                Meeting Title (Required)
              </label>
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Meeting Title"
                value={schedule.meetingTitle}
                onChange={(e) =>
                  setSchedule({ ...schedule, meetingTitle: e.target.value })
                }
              />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meeting Start Time */}
            <div>
              <label className="text-sm font-medium text-text mb-1 flex items-center">
                <FaClock className="mr-2 text-primary" />
                Start Time (Required)
              </label>
              <input
                type="datetime-local"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                value={schedule.startTime}
                onChange={(e) =>
                  setSchedule({ ...schedule, startTime: e.target.value })
                }
              />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Meeting End Time */}
            <div>
              <label className="text-sm font-medium text-text mb-1 flex items-center">
                <FaClock className="mr-2 text-primary" />
                End Time (Required)
              </label>
              <input
                type="datetime-local"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                value={schedule.endTime}
                onChange={(e) =>
                  setSchedule({ ...schedule, endTime: e.target.value })
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
                value={schedule.department}
                onChange={(e) =>
                  setSchedule({ ...schedule, department: e.target.value })
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
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Instructor Name"
                value={schedule.instructor}
                onChange={(e) =>
                  setSchedule({ ...schedule, instructor: e.target.value })
                }
              />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* faculty */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Faculty (Required)
              </label>
              <select 
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              
                value={schedule.faculty}
                onChange={(e) =>
                  setSchedule({ ...schedule, faculty: e.target.value })
                }
              >
                <option value="">Select Faculty</option>
                {faculty.map((dept, i) => (
                  <option key={i} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Academic Level */}
            <div>
              <label className="text-sm font-medium text-text mb-1 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-primary" />
                Academic Level (Required)
              </label>
              <select 
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              
                value={schedule.academicLevel}
                onChange={(e) =>
                  setSchedule({ ...schedule, academicLevel: e.target.value })
                }
              >
                <option value="">Select Academic Level</option>
                {academicLevels.map((level, i) => (
                  <option key={i} value={level}>
                    {level}
                  </option>
                ))}
              </select>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          {/* Meeting Description */}
          <div>
            <label className="text-sm font-medium text-text mb-1 flex items-center">
              <FaAlignLeft className="mr-2 text-primary" />
              Meeting Description
            </label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              rows={3}
              placeholder="Enter meeting description..."
                value={schedule.description}
                onChange={(e) =>
                  setSchedule({ ...schedule, description: e.target.value })
                }
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
          <Link
            href="/admin/dashboard/schedules"
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
    </>
  );
}
