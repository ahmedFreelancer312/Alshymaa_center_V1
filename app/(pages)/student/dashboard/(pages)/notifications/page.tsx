'use client';
import { FaBell, FaCheck, FaTimes, FaRegClock, FaRegBookmark, FaRegEnvelope } from 'react-icons/fa';

const notifications = [
  {
    id: 1,
    title: 'New Assignment Posted',
    message: 'Data Structures assignment 3 has been posted. Due April 15.',
    course: 'CS201 - Data Structures',
    time: '2 hours ago',
    read: false,
    type: 'assignment'
  },
  {
    id: 2,
    title: 'Grade Released',
    message: 'Your grade for Operating Systems Midterm is now available.',
    course: 'CS301 - Operating Systems',
    time: '1 day ago',
    read: true,
    type: 'grade'
  },
  {
    id: 3,
    title: 'Lecture Cancelled',
    message: 'Database Systems lecture on April 10 is cancelled.',
    course: 'IS401 - Database Systems',
    time: '2 days ago',
    read: false,
    type: 'announcement'
  },
  {
    id: 4,
    title: 'New Message',
    message: 'You have a new message from Dr. Ahmed about your project.',
    course: 'CS501 - AI',
    time: '3 days ago',
    read: true,
    type: 'message'
  },
  {
    id: 5,
    title: 'Upcoming Deadline',
    message: 'Computer Networks project submission due in 3 days.',
    course: 'CE205 - Computer Networks',
    time: '4 days ago',
    read: false,
    type: 'reminder'
  }
];

const getNotificationIcon = (type : string) => {
  switch(type) {
    case 'assignment':
      return <FaRegBookmark className="text-primary" />;
    case 'grade':
      return <FaCheck className="text-success" />;
    case 'announcement':
      return <FaBell className="text-warning" />;
    case 'message':
      return <FaRegEnvelope className="text-primary-light" />;
    case 'reminder':
      return <FaRegClock className="text-error" />;
    default:
      return <FaBell className="text-text-secondary" />;
  }
};

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text">Notifications</h1>
            <p className="text-sm text-text-secondary">
              You have {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark">
              Mark all as read
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-background-secondary">
              Filter
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`border-b border-gray-200 last:border-b-0 ${!notification.read ? 'bg-primary-light/5' : ''}`}
            >
              <div className="p-4 flex">
                {/* Icon */}
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-primary/10' : 'bg-background-secondary'}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${!notification.read ? 'text-text' : 'text-text-secondary'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-text-secondary flex items-center">
                      <FaRegClock className="mr-1" /> {notification.time}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-text-secondary">
                    {notification.message}
                  </p>
                  <p className="text-xs mt-2 text-primary">
                    {notification.course}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex-shrink-0 ml-4 flex space-x-2">
                  {!notification.read && (
                    <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-primary-light/10">
                      <FaCheck className="text-primary" />
                    </button>
                  )}
                  <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-primary-light/10">
                    <FaTimes className="text-text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (uncomment if needed) */}
        {/* <div className="text-center py-12">
          <div className="mx-auto h-16 w-16 bg-background-secondary rounded-full flex items-center justify-center mb-4">
            <FaBell className="text-2xl text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text">No notifications</h3>
          <p className="mt-1 text-sm text-text-secondary">
            When you get notifications, they'll appear here.
          </p>
        </div> */}
      </div>
    </div>
  );
}