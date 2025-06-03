/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaTasks, FaArrowLeft, FaSearch, FaCalendarAlt, FaFilePdf } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../ui/loading";

interface Assignment {
  _id: string;
  assignmentCode: string;
  courseCode: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  fileUrl?: string;
  createdAt: string;
}

export default function AllAssignmentsSection() {
  const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("/api/student/assignments");
        const assignments = response.data.assignments.map((assignment: any) => ({
          _id: assignment._id,
          assignmentCode: assignment.assignmentCode,
          courseCode: assignment.courseCode,
          courseName: assignment.courseName,
          title: assignment.title,
          description: assignment.description,
          dueDate: new Date(assignment.dueDate).toLocaleDateString(),
          fileUrl: assignment.fileUrl,
          createdAt: new Date(assignment.createdAt).toLocaleDateString()
        }));
        setAllAssignments(assignments);
      } catch (err) {
        setError("Failed to load assignments. Please try again later.");
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Filter assignments based on search term
  const filteredAssignments = allAssignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/student/dashboard"
            className="flex items-center text-blue-600 w-max hover:underline text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Page header */}
        <div className="bg-white rounded-lg shadow border border-gray-200 mb-6 sm:mb-8">
          <div className="bg-blue-600 px-4 py-4 sm:px-6 sm:py-5 rounded-t-lg">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">All Course Assignments</h1>
                <p className="text-white/90 mt-1 text-sm sm:text-base">
                  Browse all your assignments in one place
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white hidden sm:block">
                <FaTasks className="text-xl text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4 sm:mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Assignments section */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Available Assignments ({filteredAssignments.length})
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                {searchTerm ? `Showing results for "${searchTerm}"` : "Sorted by course and due date"}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="flex flex-col gap-3 sm:gap-5 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600 hidden sm:block">
                      <FaTasks className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                          {assignment.title}
                        </h3>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <FaCalendarAlt className="text-xs sm:text-sm" />
                          <span>Due: {assignment.dueDate}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 line-clamp-2">
                        {assignment.description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 sm:py-1 rounded">
                          {assignment.courseCode}
                        </span>
                        <span className="text-xs text-gray-500">
                          {assignment.courseName} • Posted: {assignment.createdAt}
                        </span>
                      </div>
                      {assignment.fileUrl && (
                        <div className="mt-2 sm:mt-3">
                          <a
                            href={assignment.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs sm:text-sm text-blue-600 hover:underline"
                          >
                            <FaFilePdf className="mr-1 text-red-500" />
                            Download Assignment File
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                {allAssignments.length === 0 ? "No assignments available" : "No assignments found matching your search"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}