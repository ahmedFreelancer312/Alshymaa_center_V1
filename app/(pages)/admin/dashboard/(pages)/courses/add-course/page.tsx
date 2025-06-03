import Link from "next/link";
import { FaBook } from "react-icons/fa";
import CourseForm from "@/components/forms/CourseForm";

export default function AddCoursePage() {
  return (
      <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text flex items-center">
          <FaBook className="mr-2 text-primary" />
          Add New Course
        </h1>
        <Link 
          href="/admin/dashboard/courses"
          className="text-primary hover:text-primary-dark flex items-center"
        >
          Back to Courses
        </Link>
      </div>
      <CourseForm />
      </>
  );
}