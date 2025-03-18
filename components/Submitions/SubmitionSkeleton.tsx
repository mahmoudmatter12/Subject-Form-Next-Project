import React from "react";

export default function SubmitionSkeleton() {
    return (
        <div className="min-h-screen bg-gray-900 p-8 rounded-2xl">
            <div className="w-full max-w-6xl mx-auto">
                {/* Back Button Skeleton */}
                <div className="mb-6">
                    <div className="h-6 w-24 bg-blue-800 rounded-full animate-pulse"></div>
                </div>

                {/* Header Skeleton */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="h-8 w-48 bg-cyan-800 rounded-full animate-pulse"></div>
                        <div className="h-6 w-20 bg-cyan-800 rounded-full animate-pulse"></div>
                    </div>
                    <div className="h-4 w-32 bg-sky-800 rounded-full mt-2 animate-pulse"></div>
                </div>

                {/* Timestamps Skeleton */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6">
                    <div className="h-6 w-32 bg-cyan-800 rounded-full mb-4 animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-48 bg-cyan-800 rounded-full animate-pulse"></div>
                        <div className="h-4 w-48 bg-cyan-800 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Subjects List Skeleton */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6">
                    <div className="h-6 w-32 bg-cyan-800 rounded-full mb-4 animate-pulse"></div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-cyan-700 p-4 rounded-lg">
                                <div className="h-4 w-32 bg-cyan-900 rounded-full animate-pulse mb-2"></div>
                                <div className="h-3 w-24 bg-cyan-900 rounded-full animate-pulse mb-1"></div>
                                <div className="h-3 w-24 bg-cyan-900 rounded-full animate-pulse mb-1"></div>
                                <div className="h-3 w-32 bg-cyan-900 rounded-full animate-pulse mb-1"></div>
                                <div className="h-3 w-32 bg-cyan-900 rounded-full animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions Skeleton */}
                <div className="bg-sky-950 rounded-lg shadow-md p-6">
                    <div className="h-6 w-32 bg-sky-800 rounded-full mb-4 animate-pulse"></div>
                    <div className="flex space-x-4">
                        <div className="h-10 w-32 bg-cyan-800 rounded-lg animate-pulse"></div>
                        <div className="h-10 w-32 bg-cyan-800 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}