import React from 'react';
import student from '@/types/student';
import { Badge } from '../ui/badge';
import QuikActionLanding from './QuikActionLanding';
import AnnouncmentsLanding from './AnnouncmentsLanding';
import QuickStatsLanding from './QuickStatsLanding';
import RecentActivityLanding from './RecentActivityLanding';


const Landing = ({ student }: { student: student }) => {
  return (
    <div className="min-h-screen">
   
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-0">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, <span className="text-sky-400">{student.fname}</span>!
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your gateway to academic success. Track grades, manage courses, and stay on top of your studies.
          </p>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-tr from-[#e0f2fe] via-[#cffafe] to-[#e0f2fe] rounded-lg shadow-lg p-8 mb-12">
          {/* Notifications bacge */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-sky-600">Student Union Portal</h1>
            <Badge variant="outline" className="bg-sky-500 text-white px-3 py-1 rounded-full">
              Notifications
            </Badge>
          </div>
          <p className="text-[#374151] mt-2">
            Your one-stop solution for academic management and student engagement.
          </p>
        </div>

        {/* Announcement Cards */}
        <AnnouncmentsLanding />

        {/* Quick Actions */}
        <QuikActionLanding role={student.role || 'defaultRole'} />

        {/* Blog Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#1f2937] p-6 rounded-xl shadow-md text-white">
            <h2 className="text-xl font-semibold text-white mb-4">Latest Blogs</h2>
            <p className="text-[#d1d5db]">
              Read the latest articles and blogs to stay informed about academic trends.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#1f2937] p-6 rounded-xl shadow-md text-white">
            <h2 className="text-xl font-semibold text-white mb-4">Trending Blogs</h2>
            <p className="text-[#d1d5db]">
              Discover popular topics and discussions among your peers.
            </p>
          </div>
        </div> */}

        {/* Stats Preview */}
        <QuickStatsLanding />

        {/* Recent Activity */}
        <RecentActivityLanding />

      </main>
    </div>
  );
};

export default Landing;