import { auth } from '@clerk/nextjs/server';

import Gust from '@/components/Gust';
import Landing from '@/components/Landing';

export default async function Home() {
  // Check if the user is logged in
  const { userId } = await auth();


  if (!userId) {
    return <Gust />
  }
  // const { fname, role } = student as student

  if (userId) {
    return<>
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-md">
        <Landing />
      </div>
    </>
  }


}