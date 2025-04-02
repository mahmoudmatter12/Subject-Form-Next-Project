'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';

interface FeedBackProps {
  totalHours: number;
  totalChecked: number;
  studentInfo: { arabicName: string; email: string; phoneNumber: string; studentId: string; academicGuide: string; cgpa: string; };
  FeedBackMessage: string;
  isSubmissionValid: boolean;
  checkedSubjects: { [key: string]: boolean };
}

const FeedBack = ({ totalHours, totalChecked, studentInfo, FeedBackMessage, isSubmissionValid, checkedSubjects }: FeedBackProps) => {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const getMaxSubjectsAndHours = (cgpa: number) => {
    if (cgpa >= 3) return { maxSubjects: 7, maxHours: 21 };
    if (cgpa >= 2 && cgpa < 3) return { maxSubjects: 6, maxHours: 18 };
    if (cgpa >= 1 && cgpa < 2) return { maxSubjects: 5, maxHours: 15 };
    return { maxSubjects: 4, maxHours: 12 };
  };

  const { maxSubjects, maxHours } = getMaxSubjectsAndHours(parseFloat(studentInfo?.cgpa) || 0);

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate requests

    setIsSubmitting(true); // Ensure state is updated before async operation starts

    try {
      const selectedSubjects = Object.keys(checkedSubjects).filter((id) => checkedSubjects[id]);

      if (selectedSubjects.length === 0) {
        toast.error('Please select at least one subject.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/submissions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: user?.id, selectedSubjects }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Submission successful!');
        window.location.reload();
      } else {
        toast.error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitting(false); // Ensure it's always reset after request completion
    }
  };


  return (
    <div className="bg-gradient-to-t from-sky-800  to-sky-900 p-6 rounded-lg shadow-xl">
      <h1 className="text-2xl lg:text-3xl font-bold text-white">Feedback</h1>
      <hr className="border-gray-700 mb-6" />

      {FeedBackMessage && (
        <div className=' rounded-lg p-6  border-red-700 border-2 m-6' >
          <p className="text-gray-300 lg:text-2xl">{FeedBackMessage}</p>
        </div>

      )}

      <div className="flex flex-col space-y-4">
        <p className="text-gray-300">
          Selected Subjects: <span className="text-white font-semibold">{totalChecked}</span>
        </p>
        <p className="text-gray-300">
          Total Credit Hours: <span className="text-white font-semibold">{totalHours}</span>
        </p>
        <p className="text-gray-300">
          Max Allowed Subjects: <span className="text-white font-semibold">{maxSubjects}</span>
        </p>
        <p className="text-gray-300">
          Max Allowed Credit Hours: <span className="text-white font-semibold">{maxHours}</span>
        </p>
      </div>

      <button
        className={`mt-6 w-full py-2 rounded-lg text-white font-semibold 
    ${!isSubmissionValid || isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
        onClick={handleSubmit}
        disabled={!isSubmissionValid || isSubmitting}  // This prevents clicking
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

    </div>
  );
};

export default FeedBack;