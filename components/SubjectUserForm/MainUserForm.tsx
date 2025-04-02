'use client';

import React, { useState } from 'react';
import StudentInfoForm from './StudentInfoForm';
import SubjectFormOne from './SubjectFormOne';
import FeedBack from './FeedBack';
import Link from 'next/link';

function MainUserForm() {
    const [totalHours, setTotalHours] = useState(0);
    const [totalChecked, setTotalChecked] = useState(0);
    const [FeedBackMessage, setFeedBackMessage] = useState('');
    const [isSubmissionValid, setIsSubmissionValid] = useState(false);
    const [checkedSubjects, setCheckedSubjects] = useState<{ [key: string]: boolean }>({});
    interface StudentInfo {
        arabicName: string; email: string; phoneNumber: string; studentId: string; academicGuide: string; cgpa: string;
    }

    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null); // Store student info (CGPA, etc.)

    return (
        <div className="bg-gradient-to-b from-sky-900 via-cyan-700 to-indigo-200  p-6 rounded-lg shadow-lg flex flex-col space-y-4">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-4 self-center">Subject Registration</h2>
                <Link
                    href="/user/dashboard"
                    className={`relative px-3 py-1 text-sm font-medium rounded-lg border-2
                        overflow-hidden inline-flex items-center justify-center
                        bg-transparent group w-fit `}
                >
                    <span className="relative z-10">Back to dashboard</span>
                    <span className={`absolute right-0 top-0 h-full w-0 bg-white/40 transition-all duration-1000 ease-in-out group-hover:w-full `}></span>
                </Link>
            </div>
            <hr className="border-gray-700 mb-8" />
            <StudentInfoForm onStudentInfoChange={setStudentInfo} />
            <hr className="border-gray-700 mb-8" />
            <SubjectFormOne
                onTotalHoursChange={setTotalHours}
                onTotalCheckedChange={setTotalChecked}
                studentInfo={studentInfo || { arabicName: '', email: '', phoneNumber: '', studentId: '', academicGuide: '', cgpa: '' }}
                setFeedBackMessage={setFeedBackMessage}
                setIsSubmissionValid={setIsSubmissionValid}
                setCheckedSubjects={setCheckedSubjects}
                checkedSubjects={checkedSubjects}
            />
            <hr className="border-gray-700 mb-8" />
            <FeedBack
                totalHours={totalHours}
                totalChecked={totalChecked}
                studentInfo={studentInfo || { arabicName: '', email: '', phoneNumber: '', studentId: '', academicGuide: '', cgpa: '' }}
                FeedBackMessage={FeedBackMessage}
                isSubmissionValid={isSubmissionValid}
                checkedSubjects={checkedSubjects}
            />
        </div>
    );
}

export default MainUserForm;