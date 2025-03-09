import React from 'react'
import Link from 'next/link';
import student from '@/types/student';
import { GetUser } from '@/lib/GetUser';

function Landing() {
    const Student = GetUser();
    const { fname, role } = Student as unknown as student;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <h1 className="text-4xl font-bold mb-8">Welcome {fname} to the Student Portal</h1>
            <div>
                <Link
                    href="/user/dashboard"
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

        </div>
    );
}

export default Landing