"use Client";
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { GetUser } from '@/lib/GetUser';
import SubmitionFeedBack from '@/components/Submitions/SubmitionFeedBack';
import SubmitionsMain from '@/components/Submitions/SubmitionsMain';
import student from '@/types/student';

export default async function DashboardPage() {
    const { userId } = await auth();
    const student = await GetUser();
    // Redirect to sign-in if the user is not logged in
    if (!userId || !student) {
        redirect('/sign-in');
    }
    
    const { id } = student as student;

    return (
        <>
            <div className="min-h-screen  text-white">
              
                {/* Dashboard Container */}
                <div className="w-full max-w-6xl mx-auto">
                    <SubmitionFeedBack/>
                    {/* FeedBack */}
                    <SubmitionsMain id={id || ''}/>
                    {/*The Submitions  */}
                </div>
            </div>
        </>
    );
}