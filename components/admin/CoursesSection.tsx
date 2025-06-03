/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBook, FaPlus, FaSearch, FaChalkboardTeacher } from "react-icons/fa";
import Loading from "../ui/loading";

type Course = {
  _id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  faculty: string;
};
export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) => {
    return course.courseCode.toLocaleLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/admin/courses");
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Delete course function

  const handleDelete = async (courseId: string) => {
    try {
      await axios.delete("/api/admin/courses", {
        data: { id: courseId }})
      setCourses(courses.filter((course) => course._id !== courseId));
      setSuccess("Course deleted successfully!");
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    } catch (error : any) {
      setError(error.response.data.message || "Failed to delete course");
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    }
  }

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text flex items-center">
          <FaBook className="mr-2 text-primary" />
          Courses Management
        </h1>
        <Link
          href="/admin/dashboard/courses/add-course"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          <FaPlus className="mr-2" />
          Add Course
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
              placeholder="Search courses..."
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
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  faculty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                    {course.courseCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {course.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text flex items-center">
                    <FaChalkboardTeacher className="mr-2 text-primary" />
                    {course.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {course.faculty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    <Link
                      href={`/admin/dashboard/courses/edit-course/${course._id}`}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      Edit
                    </Link>
                    <button 
                    onClick={() => handleDelete(course._id)}
                    className="text-error hover:text-error-dark cursor-pointer">
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
