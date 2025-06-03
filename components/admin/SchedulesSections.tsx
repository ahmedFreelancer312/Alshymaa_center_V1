/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCalendarAlt, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import Loading from "../ui/loading";

type Schedule = {
  _id: string;
  meetingCode: string;
  meetingTitle: string;
  department: string;
  instructor: string;
};

export default function SchedulesSections() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeetings = schedules.filter((schedule) => {
    return schedule.meetingCode
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await axios.get("/api/admin/schedules");
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const handleDelete = async (schedulerId: string) => {
    try {
      await axios.delete("/api/admin/schedules", {
        data: { id: schedulerId },
      })
      setSchedules((schedule) => schedule.filter((schedule) => schedule._id !== schedulerId));
      setSuccess("Schedule deleted successfully");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error : any) {
      setError("Failed to delete schedule. Please try again.");
      setTimeout(() => {
        setError(error.response.data.message || "An error occurred");
      }, 3000);
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text flex items-center">
          <FaCalendarAlt className="mr-2 text-primary" />
          Meetings Schedule
        </h1>
        <Link
          href="/admin/dashboard/schedules/add-schedule"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          <FaPlus className="mr-2" />
          Schedule Meeting
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {success && (
          <div className="bg-success/10 text-success p-4 rounded-lg mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-error/10 text-error p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="mb-4 flex justify-between items-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMeetings.map((schedule) => (
                <tr key={schedule._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {schedule.meetingCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                    {schedule.meetingTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {schedule.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {schedule.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    <Link 
                      href={`/admin/dashboard/schedules/edit-schedule/${schedule._id}`}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      Edit
                    </Link>
                    <button 
                    onClick={() => handleDelete(schedule._id)}
                    className="text-error hover:text-error-dark">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
