import Link from "next/link";
import { FaUser } from "react-icons/fa";
import RegisterStudentForm from "@/components/forms/RegisterStudentForm";

export default function AddStudentPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text flex items-center">
          <FaUser className="mr-2 text-primary" />
          Add New Student
        </h1>
        <Link
          href="/admin/dashboard/students"
          className="text-primary hover:text-primary-dark flex items-center"
        >
          Back to Students
        </Link>
      </div>
      <RegisterStudentForm />
    </>
  );
}
