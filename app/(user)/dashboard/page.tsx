'use server';
import { UserButton, SignOutButton} from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import GetUser from '@/lib/GetUser';

export default async function DashboardPage() {
  const { userId } = await auth()
  const student  = await GetUser();
  // console.log(student);
  // Redirect to sign-in if the user is not logged in
  if (!userId ) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <p className="text-lg mb-4">Welcome {student?.fname}  to your dashboard!</p>
      <div className="flex items-center gap-4">
        <UserButton />
        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer">
        <SignOutButton >
          <p>Custom sign out button</p>
        </SignOutButton>
        </button>
      </div>
    </div>
  );
}