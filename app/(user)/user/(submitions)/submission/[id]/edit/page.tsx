"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export default function EditSubmissionPage() {
    const [submission, setSubmission] = useState<Submission | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [submittingloading, setSubmittingLoading] = useState(false);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchSubmission = async () => {
            const response = await fetch(`/api/submissions/${id}`);
            if (!response.ok) {
                toast.error("Failed to fetch submission details.");
                router.push("/dashboard");
                return;
            }
            const data = await response.json();
            setSubmission(data);
            setIsLoading(false);
        };

        fetchSubmission();
    }, [id, router]);

    const handleSave = async () => {
        setSubmittingLoading(true);
        if (!submission) {
            toast.error("Submission data is missing.");
            return;
        }
        try {
            const response = await fetch(`/api/submissions/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submission),
            });

            if (response.ok) {
                toast.success("Submission updated successfully!");
                router.push(`/user/submission/${id}`);
                setSubmittingLoading(false);
            } else if (response.status === 400 || response.status === 406) {
                const error = await response.json();
                toast.error(error.error);
                setSubmittingLoading(false);
            } else {
                toast.error("Failed to update submission");
                setSubmittingLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update submission");
            setSubmittingLoading(false);
        }
    };

    const handleSubjectChange = (index: number, field: string, value: string | number | boolean) => {
        if (!submission) return;

        const updatedSubjects = [...submission.subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
        setSubmission({ ...submission, subjects: updatedSubjects });
    };

    const handleAddSubject = () => {
        if (!submission) return;

        const newSubject = {
            id: `temp-${Date.now()}`,
            subjectCode: "",
            name: "",
            isOpen: true,
            creditHours: 3,
            prerequisites: [],
            createdAt: new Date().toISOString(),
        };

        setSubmission({ ...submission, subjects: [...submission.subjects, newSubject] });
    };

    const handleRemoveSubject = (index: number) => {
        if (!submission) return;

        const updatedSubjects = submission.subjects.filter((_, i) => i !== index);
        setSubmission({ ...submission, subjects: updatedSubjects });
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-900 p-8">Loading...</div>;
    }

    if (!submission) {
        return <div className="min-h-screen bg-gray-900 p-8">Submission not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8 rounded-2xl">
            <div className="w-full max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    className="mb-6 text-blue-500 hover:text-blue-400 transition-colors cursor-pointer border-b border-blue-500"
                    onClick={() => router.back()}
                >
                    ← Back to Submission Details
                </button>

                {/* Header */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6 text-white">
                    <h1 className="text-2xl font-bold">Edit Submission</h1>
                    <p className="text-sm text-gray-400 mt-2">ID: {submission.id}</p>
                </div>

                {/* Status Field */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6">
                    <label className="block text-sm font-medium text-white mb-2">Status</label>

                    <div className="bg-cyan-900 text-white p-2 rounded-lg w-full">
                        {/* <label className="block text-sm font-medium text-white mb-2">Created At</label> */}
                        {/* <p>{new Date(submission.createdAt).toLocaleString()}</p> */}
                        <div className="flex items-center space-x-2">
                            {submission.status.toLowerCase() === "pending" && (
                                <span className="bg-yellow-600 text-white px-2 py-1 rounded-lg">Pending</span>
                            )}
                            {submission.status.toLowerCase() === "accsepted" && (
                                <span className="bg-green-700 text-white px-2 py-1 rounded-lg">Approved</span>
                            )}
                            {submission.status.toLowerCase() === "rejected" && (
                                <span className="bg-red-700 text-white px-2 py-1 rounded-lg">Rejected</span>
                            )}
                        </div>
                    </div>

                </div>

                {/* Subjects List */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Subjects</h2>
                    <div className="space-y-4">
                        {submission.subjects.map((subject, index) => (
                            <div key={subject.id} className="bg-cyan-900 p-4 rounded-lg">
                                <label htmlFor="" >
                                    Subject Name
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Subject Name"
                                    value={subject.name}
                                    onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
                                    className="mb-2 bg-gray-800 text-white cursor-not-allowed "
                                    disabled={true}
                                />
                                <label htmlFor="">
                                    Subject Code
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Subject Code"
                                    value={subject.subjectCode}
                                    onChange={(e) => handleSubjectChange(index, "subjectCode", e.target.value)}
                                    className="mb-2 bg-gray-800 text-white cursor-not-allowed"
                                    disabled={true}
                                />
                                <label htmlFor="">
                                    Credit Hours
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Credit Hours"
                                    value={subject.creditHours}
                                    onChange={(e) => handleSubjectChange(index, "creditHours", parseInt(e.target.value))}
                                    className="mb-2 bg-gray-800 text-white cursor-not-allowed"
                                    disabled={true}
                                />
                                <Button
                                    onClick={() => handleRemoveSubject(index)}
                                    className=" bg-red-500 hover:bg-red-600 cursor-pointer"
                                >
                                    Remove Subject
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleAddSubject} className="mt-4 w-full bg-blue-500 hover:bg-blue-600">
                        Add Subject
                    </Button>
                </div>

                {/* Actions */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6">
                    <div className="flex space-x-4">
                        <Button onClick={handleSave}
                         className="bg-green-500 hover:bg-green-600"
                         disabled={submittingloading}
                         >
                            {submittingloading && "Updating"}
                            {!submittingloading && "Save Changes"}
                        </Button>
                        <Button
                            onClick={() => router.push(`/user/submission/${id}`)}
                            className="bg-gray-500 hover:bg-gray-600"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
