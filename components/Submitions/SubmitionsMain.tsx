"use client";

import { useEffect, useState } from 'react';
import SubmissionCard from './SubmitionsCard';

export default function SubmitionsMain() {
    const [submissions, setSubmissions] = useState<{ id: string; title: string; content: string; createdAt: string; isApproved: string }[]>([]);

    useEffect(() => {
        // Fetch the submissions data from your API
        const fetchSubmissions = async () => {
            const response = await fetch('/api/submissions');
            const data = await response.json();
            setSubmissions(data);
        };

        fetchSubmissions();
    }, []);

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">My Submissions</h2>
            <div className="space-y-4">
                {submissions.map((submission) => (
                    <SubmissionCard key={submission.id} submission={submission} />
                ))}
            </div>
        </div>
    );
}