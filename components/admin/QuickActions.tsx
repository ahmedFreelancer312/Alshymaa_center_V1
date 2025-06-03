"use client";
import Link from "next/link";
import { FaUsers, FaBook, FaCalendarAlt, FaChartLine } from "react-icons/fa";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Student",
      icon: <FaUsers className="text-xl" />,
      link: "/admin/dashboard/students/add-student",
      bgColor: "bg-primary-light/10",
      iconColor: "text-primary",
    },
    {
      title: "Create Course",
      icon: <FaBook className="text-xl" />,
      link: "/admin/dashboard/courses/add-course",
      bgColor: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Schedule Meeting",
      icon: <FaCalendarAlt className="text-xl" />,
      link: "/admin/dashboard/schedules/add-schedule",
      bgColor: "bg-warning/10",
      iconColor: "text-warning",
    },
    {
      title: "Generate Report",
      icon: <FaChartLine className="text-xl" />,
      link: "/admin/dashboard/Assignments",
      bgColor: "bg-error/10",
      iconColor: "text-error",
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-text mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.link}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center hover:border-primary hover:shadow-md transition-all"
          >
            <div
              className={`p-3 rounded-full ${action.bgColor} ${action.iconColor} mb-3`}
            >
              {action.icon}
            </div>
            <span className="font-medium text-text">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
