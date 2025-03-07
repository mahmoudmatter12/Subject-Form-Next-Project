'use server';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { GetUser } from '@/lib/GetUser';
import Link from 'next/link';

export default async function DashboardPage() {
  const { userId } = await auth();
  const student = await GetUser();
  const Role = student?.role;

  // Redirect to sign-in if the user is not logged in
  if (!userId || !student) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Sign-Out Button */}
        <div className="flex items-center gap-4">
          <UserButton />
          <p className="text-lg">Welcome, {student.fname}!</p>
        </div>

        {/* User Icon and Name */}

        <div className="flex items-center">
          <SignOutButton>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer">
              Sign Out
            </button>
          </SignOutButton>

          {Role === 'ADMIN' && (
            <Link href="/admin/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-4">
              Go to Admin Dashboard
            </Link>
          )}

          <Link href="/user/profile" className="bg-blue-500 text-white px-4  py-2 rounded-lg hover:bg-blue-600 ml-4">
            Edit Profile
          </Link>
           
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-700 mb-8" />

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Subject Form Registration Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Subject Form Registration</h2>
          <p className="text-gray-400">
            Register for your subjects for the upcoming semester.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Register Now
          </button>
        </div>

        {/* Add more cards here */}
        {/* Example Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Service 2</h2>
          <p className="text-gray-400">
            Description of the second service.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Learn More
          </button>
        </div>

        {/* Example Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Service 3</h2>
          <p className="text-gray-400">
            Description of the third service.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}