import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GetUser } from '@/lib/GetUser'
import MainUserForm from '@/components/SubjectUserForm/MainUserForm';

async function SubjectForm() {

  const student = await GetUser();


  return (
    <div className="min-h-screen  text-white p-8">
      {/* Dashboard Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* User Icon and Name */}
          <div className="flex items-center gap-4 mb-4 md:mb-0 ">
            <Image
              src={student?.imgUrl || '/next.svg'} // Fallback to a local image if user.imageUrl is undefined
              alt="User Profile Image"
              className="w-12 h-12 rounded-full mr-4"
              width={48}
              height={48}
            />
            <p className="text-2xl font-bold mr-10 md:text-white">Welcome,{student.fname}!</p>

          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/user/profile"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Profile
            </Link>

            {student.role === 'ADMIN' && (
              <Link
                href="/admin/dashboard"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Admin Dashboard
              </Link>
            )}

            {student.role === 'STUDENT' && (
              <Link
                href="/admin/dashboard"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                User Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-700 mb-8" />

        {/* Form Section */}

        <MainUserForm />
      </div>
    </div>
  )
}

export default SubjectForm