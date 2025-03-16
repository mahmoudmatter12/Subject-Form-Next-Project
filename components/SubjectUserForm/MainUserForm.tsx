'use client'; // Mark this as a Client Component

import React from 'react'
import StudentInfoForm from './StudentInfoForm'
import SubjectFormOne from './SubjectFormOne'
import FeedBack from './FeedBack';

function MainUserForm() {

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
                <h2 className="text-2xl font-bold mb-4 self-center"> Subject Rejistration </h2>
                <hr className="border-gray-700 mb-8" />
                <StudentInfoForm />
                <hr className="border-gray-700 mb-8" />
                <SubjectFormOne />
                <hr className="border-gray-700 mb-8" />
                <FeedBack />
            </div>
        </>
    )
}

export default MainUserForm