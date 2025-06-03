import { ReactNode } from "react";
// import { adminAuthOptions } from "@/lib/adminAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { authOptions } from "../../../../lib/authOptions";

const LayoutDashboard = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/admin/login");
  }
  return<div className="flex h-screen bg-background">
  <Sidebar />
  <div className="flex-1 overflow-auto">
    <AdminHeader />
    <main className="p-6">
      {children}
    </main>
  </div>
</div>;
};

export default LayoutDashboard;
