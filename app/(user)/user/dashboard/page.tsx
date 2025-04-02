import { GetUser } from "@/lib/GetUser";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import TrackingSection from "./components/TrackingSection";
import ImportantFormsSection from "./components/ImportantFormsSection";
import Blogs from "./components/Blogs";
import NotificationsCenter from "./components/NotificationsCenter";
import RecentActivity from "./components/RecentActivity";
import ActionsSection from "./components/ActionsSection";

export default async function DashboardPage() {
  const { userId } = await auth();
  const student = await GetUser({ pathName: "/user/dashboard" });

  if (!student) {
    console.log("No student profile found");
    redirect("/sign-in");
  }
  if (!userId) {
    console.log("No user authenticated");
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Welcome Header */}

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome back, <span className="text-sky-400">{student.fname}</span>!
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Heres whats happening with your academics
        </p>
      </div>

      {/* Tracking Section */}
      <TrackingSection student={student} />
      <hr className="my-8 border-white " />


      <ImportantFormsSection />
      <hr className="my-8 border-white " />


      {/* Trending colorFULL Blogs Cards */}
      <Blogs />
      <hr className="my-8 border-white " />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <NotificationsCenter />
        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* All Features */}
      <ActionsSection />


    </div>
  );
}