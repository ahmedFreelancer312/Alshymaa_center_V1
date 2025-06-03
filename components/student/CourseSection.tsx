"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookOpen, FaChalkboardTeacher, FaUniversity } from "react-icons/fa";
import Loading from "../ui/loading";
import Link from "next/link";

// Define Course Type
type Course = {
  _id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  department: string;
  files : string
};

export default function CourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/student/courses");
        console.log(data)
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">
            You are enrolled in{" "}
            <span className="text-primary font-semibold">{courses.length}</span>{" "}
            courses this semester
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {courses.length > 0 ? (
            <>
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-primary/20 hover:-translate-y-2 hover:scale-105"
                >
                  {/* Course Header */}
                  <div className="bg-primary px-5 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white">
                          {course.courseCode}
                        </span>
                        <h3 className="text-lg font-bold mt-1 text-white md:text-xl">
                          {course.courseName} Course
                        </h3>
                      </div>
                      <div className="p-2 rounded-lg bg-white">
                        <FaBookOpen className="text-lg text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FaChalkboardTeacher className="text-primary-light mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">Instructor</p>
                          <p className="text-sm font-medium">
                            {course.instructor}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <FaUniversity className="text-primary-light mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-sm font-medium">
                            {course.department}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Lectures</span>
                          <span>{course.files.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                      <Link href={`/student/dashboard/courses/course-materials/${course._id}`} className="w-full text-[12px] py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 font-medium md:text-[20px]">
                        View Course Materials
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No courses enrolled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
