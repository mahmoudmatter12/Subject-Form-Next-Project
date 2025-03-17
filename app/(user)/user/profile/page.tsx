'use client'; // Mark this as a Client Component

import { useUser } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SignOutButton } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { academicGuide, level, program } from '@prisma/client';


export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    redirect('/sign-in');
  }

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    arabicName: '',
    email: '',
    phoneNumber: '',
    studentId: '',
    academicGuide: '',
    imgUrl: '',
    cgpa: '',
    level: '',
    program: '',
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  // Fetch the student's data
  useEffect(() => {
    if (user?.id) {
      fetch(`/api/student/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            fname: data.fname,
            lname: data.lname || '',
            arabicName: data.arabicName || '',
            email: data.email,
            phoneNumber: data.phoneNumber || '',
            studentId: data.studentId,
            academicGuide: data.academicGuide || '',
            imgUrl: data.imgUrl || '',
            cgpa: data.cgpa || '',
            level: data.Level || '',
            program: data.Program || '',
          });
        });
    }
  }, [user?.id]);


  console.log(formData);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormChanged(true);
  };

  // Handle select changes
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormChanged(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/student/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully');
        setIsFormChanged(false);
      } else {
        toast.error('Failed to update profile');
        console.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Top Section: User Name and Icon */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Image
            src={user?.imageUrl || '/next.svg'} // Fallback to a local image if user.imageUrl is undefined
            alt="User Profile Image"
            className="w-12 h-12 rounded-full mr-4"
            width={48}
            height={48}
          />
          <h1 className="text-2xl font-bold mr-10">
            {formData?.fname} {formData?.lname}
          </h1>
        </div>
        <button
          onClick={() => router.push('/user/dashboard')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Dashboard
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Edit Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="arabicName" className="block text-sm font-medium text-gray-300">
              Arabic Name
            </label>
            <input
              type="text"
              id="arabicName"
              name="arabicName"
              value={formData.arabicName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
              required
              disabled
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-300">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
              required
              disabled
            />
          </div>
          <div>
            <label htmlFor="academicGuide" className="block text-sm font-medium text-gray-300">
              Academic Guide
            </label>
            <select
              id="academicGuide"
              name="academicGuide"
              value={formData.academicGuide}
              onChange={handleSelectChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Academic Guide</option>
              {Object.values(academicGuide).map((guide) => (
                <option key={guide} value={guide}>{guide}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-300">
              Level
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleSelectChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Level</option>
              {Object.values(level).map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-300">
              Program
            </label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleSelectChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Program</option>
              {Object.values(program).map((prog) => (
                <option key={prog} value={prog}>{prog}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-300">
              CGPA
            </label>
            <input
              type="text"
              id="cgpa"
              name="cgpa"
              value={formData.cgpa || 'N/A'}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label htmlFor="imgurl" className="block text-sm font-medium text-gray-300">
              Personal Img
            </label>
            <input
              type="text"
              id="imgurl"
              name="imgurl"
              value={formData.imgUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          {/* Buttons Section */}
          <div className="flex justify-between mt-6">
            <div
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              <SignOutButton>
                <button>sign out</button>
              </SignOutButton>
            </div>

            <button
              type="submit"
              disabled={!isFormChanged}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${!isFormChanged ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}