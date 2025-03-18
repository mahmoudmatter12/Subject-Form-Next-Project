"use client";

import SubmitionSkeleton from "@/components/Submitions/SubmitionSkeleton";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import SubmitionNotFound from "@/components/Submitions/SubmitionNotFound";
import { toast } from "react-toastify";

interface Submission {
    id: string;
    studentId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    subjects: {
        id: string;
        subjectCode: string;
        name: string;
        isOpen: boolean;
        creditHours: number;
        prerequisites: string[];
        createdAt: string;
    }[];
}

export default function SubmissionDetails() {
    const [submission, setSubmission] = useState<Submission | null>(null);
    const [found, setFound] = useState(true);
    const router = useRouter();
    const { id } = useParams();
    const [deleteloading, setdeleteloading] = useState(false)

    useEffect(() => {
        // Fetch the submission details from your API
        const fetchSubmission = async () => {
            const response = await fetch(`/api/submissions/${id}`);
            if (!response.ok && response.status === 404) {
                setFound(false);
            }
            const data = await response.json();
            setSubmission(data);
        };

        fetchSubmission();
    }, [id, router]);

    const handleDelete = async () => {
        try {
            setdeleteloading(true);
            const response = await fetch(`/api/submissions/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setdeleteloading(false);
                toast.success("Submission deleted successfully");
                router.push("/user/dashboard");
            }
        } catch (error) {
            setdeleteloading(false);
            toast.error("An error occurred while deleting the submission");
            console.error(error);
        }
    };

    if (!submission) {
        return (
            <SubmitionSkeleton />
        );
    }

    const statusColor = {
        PENDING: "bg-yellow-500",
        ACCSEPTED: "bg-green-500",
        REJECTED: "bg-red-500",
    }[submission.status];

    if (!found) {
        return <SubmitionNotFound />
    }
    return (
        <div className="min-h-screen bg-gray-900 p-8 rounded-2xl">
            <div className="w-full max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    className="mb-6 text-blue-500 hover:text-blue-400 transition-colors cursor-pointer border-b border-blue-500"
                    onClick={() => router.back()}
                >
                    ← Back to Submissions List
                </button>

                {/* Header */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6  text-white ">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold ">Submission Details</h1>
                        <span className={`${statusColor} text-white text-sm px-3 py-1 rounded-full`}>
                            {submission.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">ID: {submission.id}</p>
                </div>

                {/* Timestamps */}
                <div className="rounded-lg shadow-md p-6 mb-6 bg-sky-950 ">
                    <h2 className="text-lg font-semibold mb-4 text-white ">Timestamps</h2>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-400">
                            <span className="font-medium">Created:</span>{" "}
                            {new Date(submission.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400">
                            <span className="font-medium">Last Updated:</span>{" "}
                            {new Date(submission.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Subjects List */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Subjects ({submission.subjects.length})</h2>
                    <div className="space-y-4">
                        {submission.subjects.map((subject) => (
                            <div key={subject.id} className="bg-cyan-900 p-4 rounded-lg">
                                <p className="text-xl  text-white font-bold">{subject.name.toUpperCase()}</p>
                                <p className="text-sm text-gray-400"> <strong> Code:</strong> {subject.subjectCode}</p>
                                <p className="text-sm text-gray-400"><strong>Credit Hours: </strong>{subject.creditHours}</p>
                                <p className="text-sm text-gray-400 ">
                                    <strong>Prerequisites:</strong>
                                    <Badge variant="outline" className="text-xs text-white ml-3 ">
                                        {subject.prerequisites.join(", ") || "None"}
                                    </Badge>
                                </p>
                                <p className="text-xs text-gray-400">
                                    <strong> Created: </strong>{new Date(subject.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-whte mb-4">Actions</h2>
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={() => router.push(`/user/submission/${id}/edit`)}
                        >
                            Edit Submission
                        </button>
                        <button
                            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors ${deleteloading ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={handleDelete}
                            disabled={deleteloading}
                        >
                            {deleteloading ? "Deleting..." : "Delete Submission"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}