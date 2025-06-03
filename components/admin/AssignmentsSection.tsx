/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTasks, FaPlus, FaSearch, FaDownload, FaTrash } from "react-icons/fa";
import Loading from "../ui/loading";

type Assignment = {
  _id: string;
  assignmentCode: string;
  title: string;
  description: string;
  courseCode: string;
  dueDate: string;
  fileUrl?: string;
  status: string;
};

export default function AssignmentsSection() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = assignments.filter((assignment) => {
    return (
      assignment.assignmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await axios.get("/api/admin/assignments");
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleDelete = async (assignmentId: string) => {
    try {
      await axios.delete("/api/admin/assignments", {
        data: { id: assignmentId }
      });
      setAssignments(assignments.filter((assignment) => assignment._id !== assignmentId));
      setSuccess("Assignment deleted successfully!");
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete assignment");
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text flex items-center">
          <FaTasks className="mr-2 text-primary" />
          Assignments Management
        </h1>
        <Link
          href="/admin/dashboard/assignments/add-assignment"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          <FaPlus className="mr-2" />
          Add Assignment
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {success && (
          <div className="mb-4 p-4 bg-success/10 text-success rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-error/10 text-error rounded-lg">
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
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Assignment Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                    {assignment.assignmentCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {assignment.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-text">
                    {assignment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {assignment.courseCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text space-x-3">
                    {assignment.fileUrl && (
                      <a
                        href={assignment.fileUrl}
                        download
                        className="text-primary hover:text-primary-dark inline-flex items-center"
                      >
                        <FaDownload className="mr-1" /> Download
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="text-error hover:text-error-dark inline-flex items-center cursor-pointer"
                    >
                      <FaTrash className="mr-1" /> Delete
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