"use client";

import { useEffect, useState } from 'react';
import SubmissionCard from './SubmitionsCard';
import Submission from '@/types/submition';

interface SubmissionProps {
    id: string;
}

export default function SubmitionsMain({ id }: SubmissionProps) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        // Fetch the submissions data from your API
        const fetchSubmissions = async () => {
            const response = await fetch(`/api/submissions/${id}`);
            const data = await response.json();
            setSubmissions(Array.isArray(data) ? data : []);
        };

        fetchSubmissions();
    }, [id]);

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