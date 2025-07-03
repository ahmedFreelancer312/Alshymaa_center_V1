"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaFileAlt,
  // FaCog,
} from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";

const sidebarLinks = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: <FiHome className="text-lg" />,
  },
  {
    href: "/admin/dashboard/students",
    label: "Students",
    icon: <FaUsers className="text-lg" />,
  },
  {
    href: "/admin/dashboard/courses",
    label: "Courses",
    icon: <FaBook className="text-lg" />,
  },
  {
    href: "/admin/dashboard/schedules",
    label: "schedules",
    icon: <FaCalendarAlt className="text-lg" />,
  },
  {
    href: "/admin/dashboard/assignments",
    label: "Assignments",
    icon: <FaFileAlt className="text-lg" />,
  },
  {
    href: "/admin/dashboard/files/",
    label: "files",
    icon: <FaFileAlt className="text-lg" />,
  },
  
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary">Code Storm Admin</h1>
        <p className="text-sm text-text-secondary">Welcome back, Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-light/10 text-primary"
                  : "hover:bg-background-secondary text-text hover:text-primary"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/logout"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-background-secondary text-text hover:text-primary"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
