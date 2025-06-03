import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Providers } from "@/components/ui/providers";
import { authOptions } from "@/lib/authOptions";

const LayoutDashboard = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "student") {
    redirect("/student/login");
  }
  return (
    <Providers>
    <div className="flex h-screen">
      {/* sidebar */}
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DashboardNavbar />
        <main className=" p-2 md:p-6 bg-background-secondary">{children}</main>
      </div>
    </div>
    </Providers>
  );
};

export default LayoutDashboard;
