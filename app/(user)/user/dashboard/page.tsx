'use server';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { GetUser } from '@/lib/GetUser';
import Link from 'next/link';
import Image from 'next/image';

export default async function DashboardPage() {
  const { userId } = await auth();
  const student = await GetUser();

  // Redirect to sign-in if the user is not logged in
  if (!userId || !student) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Dashboard Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* User Icon and Name */}
          <div className="flex items-center gap-4 mb-4 md:mb-0 ">
            <Image
              src={student?.imgUrl || '/next.svg'} // Fallback to a local image if user.imageUrl is undefined
              alt="User Profile Image"
              className="w-12 h-12 rounded-full mr-4"
              width={48}
              height={48}
            />
            <p className="text-2xl font-bold mr-10 md:text-white">Welcome,{student.fname}!</p>
            <Link
              href="/user/profile"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Profile
            </Link>
          </div>

          {/* Buttons
          <div className="flex items-center gap-4">

          </div> */}
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-700 mb-8" />

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Subject Form Registration Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Subject Form Registration</h2>
            <p className="text-gray-400 mb-4">
              Register for your subjects for the upcoming semester.
            </p>
            <Link
              href="/user/form"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Register Now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}