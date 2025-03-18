import React from 'react'
import { useParams,useRouter } from 'next/navigation'

function SubmitionNotFound() {
    const { id } = useParams();
    const router =  useRouter();
    return (
        <>
            <button
                className="mb-6 text-blue-500 hover:text-blue-400 transition-colors cursor-pointer border-b border-blue-500"
                onClick={() => router.back()}
            >
                ← Go Back
            </button>
            {/* Header */}
            <div className="bg-sky-950 rounded-lg shadow-md p-6 mb-6  text-white ">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold ">
                        Submition Not Found
                    </h1>
                    <p>
                        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                            NOT FOUND
                        </span>
                    </p>
                </div>
                <p className="text-sm text-gray-400 mt-2">ID: {id} </p>
            </div>
            <div className="bg-sky-950 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-whte mb-4 text-center ">Actions</h2>
                <div className="flex space-x-4 justify-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Create New Submission
                    </button>
                </div>
            </div>
        </>
    )
}

export default SubmitionNotFound