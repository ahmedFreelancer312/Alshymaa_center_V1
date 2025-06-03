
"use client";
import { useState, useEffect } from "react";
import { CgSidebar, CgSidebarRight } from "react-icons/cg";
import { GiBookmarklet } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BiBookOpen } from "react-icons/bi";
import { MdOutlineAssignment } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../ui/loading";

const Links = [
  { id: 0, label: "home", icon: <AiOutlineHome />, path: "/student/dashboard" },
  {
    id: 1,
    label: "Courses",
    icon: <BiBookOpen />,
    path: "/student/dashboard/courses",
  },
  {
    id: 2,
    label: "Assignments",
    icon: <MdOutlineAssignment />,
    path: "/student/dashboard/assignments",
  },
  {
    id: 3,
    label: "Files",
    icon: <FiFileText />,
    path: "/student/dashboard/files",
  },
  {
    id: 4,
    label: "Schedule",
    icon: <CiCalendar />,
    path: "/student/dashboard/schedule",
  },
  {
    id: 5,
    label: "Notifications",
    icon: <IoNotificationsOutline />,
    path: "/student/dashboard/notifications",
  },
  {
    id: 6,
    label: "AI Assistant",
    icon: <RiRobot2Line />,
    path: "/student/dashboard/Ai-assistant",
  },
  {
    id: 7,
    label: "Settings",
    icon: <IoSettingsOutline />,
    path: "/student/dashboard/settings",
  },
];

const Sidebar = () => {
  const { data: session} = useSession();
  const pathName = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`relative bg-primary h-screen flex flex-col border-r border-primary-light ${isExpanded ? "w-64" : "w-20"} transition-all duration-300 ease-in-out`}>
      {/* Toggle Button */}
      <button
        className="hidden md:block absolute -right-3 top-20 p-1 bg-primary-light rounded-full text-white cursor-pointer z-10 border-2 border-white shadow-md hover:bg-primary-lighter"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <span className="text-lg">
          {isExpanded ? <CgSidebar size={18} /> : <CgSidebarRight size={18} />}
        </span>
      </button>

      {/* Logo */}
      <div className="flex items-center space-x-2 p-6 justify-center border-b border-primary-light">
        <span className="text-primary bg-background p-2 rounded-md text-xl">
          <GiBookmarklet />
        </span>
        {isExpanded && (
          <span className="text-white text-lg font-semibold whitespace-nowrap">
            My Dashboard
          </span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {Links.map((item) => (
          <Link 
            key={item.id} 
            href={item.path}
            className="hover:no-underline"
          >
            <div
              title={item.label}
              className={`flex items-center space-x-3 p-3 hover:bg-primary-light rounded-md transition-all duration-200 ease-in-out ${
                isExpanded ? "justify-start" : "justify-center"
              } ${pathName === item.path ? "bg-primary-light font-medium" : ""}`}
            >
              <span className="text-white text-xl">{item.icon}</span>
              {isExpanded && (
                <span className="text-white text-sm font-medium capitalize whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* User Info */}
      <div className={`p-4 border-t border-primary-light  ${isExpanded ? "px-4" : "px-2"}`}>
      {session?.user.name ? (
                <div className={`flex items-center bg-primary-light ${isExpanded ? "justify-start space-x-3" : "justify-center"} p-4 rounded-md text-white`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold">
                  {session?.user.name ? session?.user.name.charAt(0).toUpperCase() : ""}
                </div>
                {isExpanded && (
                  <div className="overflow-hidden">
                      <>
                        <p className="text-sm font-semibold">{session.user.name}</p>
                        <p className="text-xs text-gray-300">
                          {session.user.academicId || "Student"}
                        </p>
                      </>
                  </div>
                )}
              </div>
      ) : (
        <Loading bg="border-r-white" />
      )}
      </div>
    </aside>
  );
};

export default Sidebar;