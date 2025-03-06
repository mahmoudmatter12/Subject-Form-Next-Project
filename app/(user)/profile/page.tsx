'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GetUser from '@/lib/GetUser';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await GetUser();
      if (!user) {
        router.push('/sign-up'); // Redirect to the sign-up page if the user doesn't exist
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div>
      <h1>Profile</h1>
        {/* Add the user's profile information here */}


    </div>
  );
}