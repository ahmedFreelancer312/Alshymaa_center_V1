"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FiBell, FiLogOut, FiUser, FiSettings, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = session?.user?.name || "Guest";
  const userRole = "Student";

  return (
    <nav className="bg-background shadow-md px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800"></h1>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notification Button */}
          <button
            aria-label="Notifications"
            className="relative p-2 text-text-secondary hover:bg-background-secondary rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <FiBell className="text-xl" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:bg-background-secondary px-3 py-2 rounded-lg transition duration-200"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {/* Avatar Circle */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-light text-white font-bold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>

              {/* Name + Arrow */}
              <span className="font-medium text-text hidden md:inline-flex items-center gap-1">
                {userName}
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-text">{userName}</p>
                  <p className="text-xs text-text-secondary">{userRole}</p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-text hover:bg-background-secondary transition duration-150"
                >
                  <FiUser className="mr-2" />
                  Profile
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-text hover:bg-background-secondary transition duration-150"
                >
                  <FiSettings className="mr-2" />
                  Settings
                </Link>

                <button
                  onClick={() => {
                    signOut()
                  }}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition duration-150"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
