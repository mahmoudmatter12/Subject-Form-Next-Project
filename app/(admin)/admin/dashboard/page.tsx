import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NotAdmin from '@/components/NotAdmin';
import StudentsTable from '@/components/StudentsTable';
import { GetUser } from '@/lib/GetUser';
import student from '@/types/student';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';


const Admin = async () => {
    const { userId } = await auth();
    const student = await GetUser();
    const { role } = student as student;

    if (!userId) {
        redirect('/sign-in');
    }

    if (role !== 'ADMIN') {
        return <NotAdmin />;
    }


    return (
        <>
            <div className="bg-black text-white p-8 "></div>
            <div className="flex items-center justify-between mb-8">
                {/* Sign-Out Button */}
                <div className="flex items-center gap-4">
                    <UserButton />
                    <p className="text-lg">Welcome, {student?.fname}!</p>
                </div>

                {/* User Icon and Name */}

                <div className="flex items-center">
                    <SignOutButton>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer">
                            Sign Out
                        </button>
                    </SignOutButton>

                    <Link href="/user/profile" className="bg-blue-500 text-white px-4  py-2 rounded-lg hover:bg-blue-600 ml-4">
                        Edit Profile
                    </Link>

                </div>
            </div>
            <hr className="border-gray-700 mb-8" />
            <div>
                <div className="p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">All Students</h2>
                    <table className="w-full">
                        <StudentsTable /> {/* StudentsTable is inside the table but properly structured */}
                    </table>
                </div>

                <div className="p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">All Subjects</h2>
                    <table className="w-full">
                    </table>
                </div>

                <div className="p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Opend Subjects</h2>
                    <table className="w-full">
                    </table>
                </div>

                <div className="p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Student submitions</h2>
                    <table className="w-full">
                    </table>
                </div>

                {/* statistics based on the cgpa */}
                <div className="p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Statistics based on the CGPA</h2>
                    <table className="w-full">
                    </table>
                </div>
            </div>
            <div />
        </>

    );
};

export default Admin;
