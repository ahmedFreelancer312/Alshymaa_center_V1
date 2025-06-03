// import AdminLayout from '@/components/admin/AdminLayout';
import QuickActions from "@/components/admin/QuickActions";
import RecentActivity from "@/components/admin/RecentActivity";
import StartSection from "@/components/admin/StartSection";

export default function AdminDashboard() {
  return (
    <>
      <StartSection />
      <QuickActions />
      <RecentActivity />
    </>
  );
}
