import React from "react";
import { FaBook } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import AdminLoginForm from "@/components/forms/AdminLoginForm";

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* University Branding */}
        <div className="text-center mb-8">
          {/* Admin Portal Title */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <RiAdminFill className="text-xl text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Code Storm Admin
              </h2>
            </div>
            <p className="text-xs text-gray-500">
              Restricted access to authorized personnel only
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <AdminLoginForm />
        </div>

        {/* Security Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <FaBook className="text-gray-400" />
            <span>© {new Date().getFullYear()} Admin System</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
