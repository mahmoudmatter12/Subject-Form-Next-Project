'use client'; // Mark this as a Client Component

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const [data,setdata] = useState(
    {
      fname: '',
      lname: '',
      arabicName: '',
      email: '',
      phoneNumber: '',
      studentId: '',
      academicGuide: '',
      imgUrl: '',
      cgpa: '',
    }
  );

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
          });
          setdata({
            fname: data.fname,
            lname: data.lname || '',
            arabicName: data.arabicName || '',
            email: data.email,
            phoneNumber: data.phoneNumber || '',
            studentId: data.studentId,
            academicGuide: data.academicGuide || '',
            imgUrl: data.imgUrl || '',
            cgpa: data.cgpa || '',
          });
        });
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/cgpa/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData((prev) => ({
            ...prev,
            cgpa: data.cgpa,
          }));
        });
    }
  }, [user?.id]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        alert('Profile updated successfully!');
        setIsFormChanged(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
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
            {user?.fullName} 
          </h1>
        </div>
        <button
          onClick={() => router.push('/user/dashboard')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Go to Dashboard
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
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              required
              disabled
            />
          </div>
          <div>
            <label htmlFor="academicGuide" className="block text-sm font-medium text-gray-300">
              Academic Guide
            </label>
            <input
              type="text"
              id="academicGuide"
              name="academicGuide"
              value={formData.academicGuide}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              disabled
            />
          </div>
          <div>
            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-300">
              CGPA
            </label>
            <input
              type="text"
              id="cgpa"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
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
            <button
              type="button"
              onClick={() => router.push('/sign-out')}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
            <button
              type="submit"
              disabled={!isFormChanged}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                !isFormChanged ? 'opacity-50 cursor-not-allowed' : ''
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