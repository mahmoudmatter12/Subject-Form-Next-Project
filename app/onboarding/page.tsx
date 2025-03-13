'use client'; // Mark this as a Client Component

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import GetUser from '@/actions/getUser';


export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    arabicName: '',
    email: '',
    phoneNumber: '',
    studentId: '',
    imgUrl: '',
  });

  // Redirect to the dashboard if the user is already onboarded
  useEffect(() => {
    if (user?.id) {
      GetUser(user.id).then((student) => {
        if (student?.onboarded) {
          // If the student is already onboarded, redirect to the dashboard
          toast.info('You are already completed your profild');
          router.push('/user/dashboard');
        } else {
          // If the student exists but is not onboarded, pre-fill the form
          setFormData((prev) => ({
            ...prev,
            firstName: student?.fname || prev.firstName,
            lastName: student?.lname || prev.lastName,
            arabicName: student?.arabicName || prev.arabicName,
            email: student?.email || prev.email,
            phoneNumber: student?.phoneNumber || prev.phoneNumber,
            studentId: student?.studentId || prev.studentId,
            imgUrl: student?.imgUrl || prev.imgUrl,
          }));
        }
      }).catch((error) => {
        console.error('Failed to fetch student:', error);
      });
    }
  }, [user, router]);

  // Update formData when the user object is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        arabicName: '',
        email: user.emailAddresses?.[0]?.emailAddress || '',
        phoneNumber: '',
        studentId: '',
        imgUrl: user.imageUrl,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;

    // Set loading state to true
    setLoading(true);

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          clerkId: user?.id, // Link the user to their Clerk ID
        }),
      });

      if (response.ok) {
        toast.success('Profile created successfully');
        router.push('/user/dashboard'); // Redirect to the dashboard after onboarding
      } else if (response.status === 409) {
        const errorData = await response.json();
        toast.error(`${errorData.error}`);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Complete Your Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-300">
              Personal Image URL
            </label>
            <input
              type="url"
              id="imgUrl"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}