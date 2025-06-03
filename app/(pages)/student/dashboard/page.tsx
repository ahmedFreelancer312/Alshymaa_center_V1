/* eslint-disable react/no-unescaped-entities */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import StartSection from "@/components/student/StartSection";
import UpcomingScheduleSection from "../../../../components/student/UpcomingScheduleSection";
import RecentlyUploadedSection from "../../../../components/student/RecentlyUploadedSection";
import StudyTipsWidget from "../../../../components/student/StudyTipsWidget";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="text-black p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6">
        <StudyTipsWidget />
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <p className="text-text-secondary text-sm sm:text-base">
          👋 Welcome back, {session?.user.name}. Here's what's happening with your
          courses.
        </p>
      </div>

      {/* Top Section */}
      <StartSection />

      {/* Bottom Section - Grid Layout */}
      <div className="grid grid-cols-1 gap-4 mt-4 sm:gap-5 sm:mt-5 md:grid-cols-2">
        {/* Recently Uploaded Files */}
        <RecentlyUploadedSection />
        
        {/* Upcoming Schedule */}
        <UpcomingScheduleSection />
      </div>
    </div>
  );
};

export default DashboardPage;