import { auth } from '@clerk/nextjs/server';

import Gust from '@/components/Gust';
import Landing from '@/components/Landing';
import { GetUser } from '@/lib/GetUser';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Check if the user is logged in
  const { userId } = await auth();
  // Get the user's data
  const student = await GetUser({ pathName: "/" });

  // Redirect to the onboarding page if the user is not onboard
    if (!student && userId) {
    redirect('/onboarding');
  }

  if (!userId) {
    return <Gust />
  }
  // const { fname, role } = student as student

  if (userId) {
    return <>
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-md">
        <Landing />
      </div>
    </>
  }


}