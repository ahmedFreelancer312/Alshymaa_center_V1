"use client";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaUniversity,
  FaFilePdf,
  FaTasks,
  FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../ui/loading";

interface ICourseFile {
  fileCode: string;
  courseCode: string;
  fileName: string;
  fileDescription: string;
  fileUrl: string;
  createdAt: string;
}

interface IAssignment {
  assignmentCode: string;
  courseCode: string;
  title: string;
  description: string;
  dueDate: string;
  fileUrl?: string;
  createdAt: string;
}

interface ICourse {
  courseCode: string;
  courseName: string;
  instructor: string;
  department: string;
  description: string;
  files?: ICourseFile[];
  assignments?: IAssignment[];
}

export default function CourseMaterials() {
  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/student/courses/${courseId}`);
        setCourse(data);
      } catch (error) {
        setError("Failed to load course data");
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!course) return <div className="p-4">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/student/dashboard/courses"
            className="text-primary hover:underline text-sm sm:text-base"
          >
            ← Back to Courses
          </Link>
        </div>

        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
          <div className="bg-primary px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  {course.courseCode}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-white">
                  {course.courseName}
                </h1>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-white hidden sm:block">
                <FaBookOpen className="text-xl sm:text-2xl text-primary" />
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <FaChalkboardTeacher className="text-primary-light text-lg sm:text-xl mr-2 sm:mr-3" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Instructor</p>
                    <p className="text-base sm:text-lg font-medium">{course.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaUniversity className="text-primary-light text-lg sm:text-xl mr-2 sm:mr-3" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Department</p>
                    <p className="text-base sm:text-lg font-medium">{course.department}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
                  Course Description
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{course.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignments Section */}
        {course.assignments && course.assignments.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
            <div className="border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 bg-primary/10">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Course Assignments
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                <span className="text-primary">{course.assignments.length}</span>{" "}
                {course.assignments.length === 1 ? "assignment" : "assignments"} available
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {course.assignments.map((assignment) => (
                <div
                  key={assignment.assignmentCode}
                  className="flex flex-col gap-3 sm:gap-5 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
                      <FaTasks className="text-lg sm:text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                          {assignment.title}
                        </h3>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <FaCalendarAlt />
                          <span>
                            Due: {new Date(assignment.dueDate).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">
                        {assignment.description}
                      </p>
                      {assignment.fileUrl && (
                        <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-2">
                          <FaFilePdf className="text-red-500 text-sm sm:text-base" />
                          <a
                            href={assignment.fileUrl}
                            download
                            className="text-primary hover:underline text-xs sm:text-sm"
                          >
                            Download Assignment File
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Files Section */}
        {course.files && course.files.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
            <div className="border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 bg-primary/10">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Course Materials
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                <span className="text-primary">{course.files.length}</span>{" "}
                {course.files.length === 1 ? "resource" : "resources"} available
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {course.files.map((file) => (
                <div
                  key={file.fileCode}
                  className="flex flex-col gap-3 sm:gap-5 items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 sm:flex-row"
                >
                  <div className="flex items-center w-full sm:w-auto">
                    <FaFilePdf className="text-red-500 text-xl sm:text-2xl mr-3 sm:mr-4" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">
                        {file.fileName}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm truncate">
                        {file.fileDescription}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Uploaded: {new Date(file.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <a
                    href={file.fileUrl}
                    download
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs sm:text-sm w-full sm:w-auto text-center"
                  >
                    Download File
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}