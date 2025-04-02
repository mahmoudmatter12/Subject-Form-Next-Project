"use client";

import { useEffect, useState } from 'react';



export default function SubmitionFeedBack() {
    const [feedback, setFeedback] = useState({
        totalSubmissions: 0,
        accepted: 0,
        rejected: 0,
        pending: 0,
    });

    useEffect(() => {
        // Fetch the feedback data from your API
        const fetchFeedback = async () => {
            const response = await fetch(`/api/submissions/feedback`);
            const data = await response.json();
            setFeedback(data);
        };

        fetchFeedback();
    }, []);

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-8 ">
            <h2 className="text-xl font-bold mb-4 text-center ">Submission Feedback</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg">Total Submissions</p>
                    <p className="text-2xl font-bold">{feedback.totalSubmissions}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg">Accepted</p>
                    <p className="text-2xl font-bold">{feedback.accepted}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg">Rejected</p>
                    <p className="text-2xl font-bold">{feedback.rejected}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg">Pending</p>
                    <p className="text-2xl font-bold">{feedback.pending}</p>
                </div>
            </div>
        </div>
    );
}