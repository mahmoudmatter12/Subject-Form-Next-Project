import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { GetUser } from '@/lib/GetUser';
async function Header() {
    const Student = await GetUser();
    if (!Student) {
        return null;
    }

    return (
        <>
            {/* <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 fixed w-full top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <FaUniversity className="text-sky-500 text-2xl" />
                        <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                            Student Union Portal
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex space-x-6">
                            <a href="/dashboard" className="text-gray-300 hover:text-sky-400 transition-colors">Dashboard</a>
                            <a href="/courses" className="text-gray-300 hover:text-sky-400 transition-colors">Courses</a>
                            <a href="/grades" className="text-gray-300 hover:text-sky-400 transition-colors">Grades</a>
                        </nav>
                    </div>
                </div>
            </header> */}

            {/* <div className="pt-16 pb-8 bg-gray-900/80">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                </div>
            </div> */}

            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                {/* User Icon and Name */}
                <div className="flex items-center gap-4 mb-4 md:mb-0 ">
                    {Student.imgUrl ? (
                        <>
                            <Image
                                src={Student?.imgUrl || ''} // Fallback to a local image if user.imageUrl is undefined
                                alt="User Profile Image"
                                className="w-12 h-12 rounded-full mr-4"
                                width={48}
                                height={48}
                            />
                            <p className="text-2xl font-bold mr-10 md:text-white">Welcome, {Student.fname}!</p>
                        </>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium text-sm">
                                {Student.fname ? Student.fname.charAt(0).toUpperCase() : 'U'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/user/profile"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Profile
                    </Link>

                    {Student.role === 'ADMIN' && (
                        <>
                            <Link
                                href="/admin/dashboard"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Admin Dashboard
                            </Link>

                            <Link
                                href="/user/dashboard"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                            >
                                User Dashboard
                            </Link>
                        </>
                    )}
                    {Student.role === 'STUDENT' && (
                        <Link
                            href="/user/dashboard"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                        >
                            User Dashboard
                        </Link>
                    )}

                </div>
            </div>

            {/* Horizontal Line */}
            <hr className="border-gray-700 mb-8" />
        </>
    )
}

export default Header