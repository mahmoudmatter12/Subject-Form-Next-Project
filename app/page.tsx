import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import GetUser from '@/lib/GetUser';
import student from '@/types/student';

export default async function Home() {
  // Check if the user is logged in
  const { userId } = await auth();
  const student = await GetUser() || {};
  const { fname, role } = student as student;



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-4xl font-bold mb-8">Welcome {fname} to the Student Portal</h1>

      {userId ? (
        <div>
          <Link
            href="/dashboard"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to Dashboard
          </Link>
          {role === 'ADMIN' &&
            (
              <Link
                href="/admin/dashboard"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 ml-10"
              >
                Go to Admin Dashboard
              </Link>
            )
          }
        </div>
      ) : (
        // If the user is not logged in, show sign-in and sign-up links
        <div className="flex gap-4">
          <Link
            href="/sign-in"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
          >
            Sign Up
          </Link>

        </div>
      )}
    </div>
  );
}