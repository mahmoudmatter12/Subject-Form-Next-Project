'use client';

import React, { useState } from 'react';
import StudentInfoForm from './StudentInfoForm';
import SubjectFormOne from './SubjectFormOne';
import FeedBack from './FeedBack';

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
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
            <h2 className="text-2xl font-bold mb-4 self-center">Subject Registration</h2>
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