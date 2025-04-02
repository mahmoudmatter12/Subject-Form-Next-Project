import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { GetUser } from '@/lib/GetUser';
import Landing from '@/components/Home/Landing';
import Guest from '@/components/Home/Gust';
import student from '@/types/student';

export default async function Home() {
  const { userId } = await auth();
  const student = await GetUser({ pathName: "/" }) as student;

  // Redirect to onboarding if user exists but student data isn't complete
  if (!student && userId) {
    redirect('/onboarding');
  }

  // Show guest page if not logged in
  if (!userId) {
    return <Guest />;
  }

  // Show landing page for authenticated users
  return (
    <div>
      {student && <Landing student={student} />}
    </div>
  );
}