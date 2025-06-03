'use client';
import Link from 'next/link';
import { FaUsers, FaBook, FaCalendarAlt } from 'react-icons/fa';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "student",
      title: "New student registered",
      description: "Ahmed Mohamed joined Computer Science program",
      time: "2 hours ago",
      icon: <FaUsers className="text-lg text-primary" />
    },
    {
      id: 2,
      type: "course",
      title: "New course created",
      description: "CS401 - Operating Systems added by Dr. Ali",
      time: "1 day ago",
      icon: <FaBook className="text-lg text-success" />
    },
    {
      id: 3,
      type: "meeting",
      title: "Faculty meeting scheduled",
      description: "Monthly faculty meeting on Friday 10 AM",
      time: "2 days ago",
      icon: <FaCalendarAlt className="text-lg text-warning" />
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text">Recent Activity</h3>
        <Link href="/admin/activity" className="text-sm text-primary hover:text-primary-dark">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
            <div className="p-2 rounded-lg bg-background-secondary mr-4">
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{activity.title}</p>
              <p className="text-xs text-text-secondary">{activity.description}</p>
            </div>
            <span className="text-xs text-text-secondary">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}