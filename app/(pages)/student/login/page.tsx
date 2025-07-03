// 'use client';
import Link from "next/link";
import { GiBookmarklet } from "react-icons/gi";
import LoginForm from "@/components/forms/StudentLoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* College Logo and Name */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-4 w-max mx-auto"
          >
            <GiBookmarklet className="text-primary text-3xl" />
            <div className="text-left">
              <h1 className="font-bold text-xl text-text">Code Storm</h1>
              <p className="text-sm text-text-secondary">
                Faculty of Computer Science
              </p>
            </div>
          </Link>
          <h2 className="text-xl font-semibold text-text">
            Student Login
          </h2>
        </div>
        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}
