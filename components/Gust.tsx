import React from 'react'
import Link from 'next/link';

function Gust() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black">
            <h1 className="text-4xl font-bold mb-8">Welcome to the Student Portal</h1>

            <div className="flex gap-4">
                <Link
                    href="/sign-in"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                    Sign In
                </Link>
                <Link
                    href="/sign-up"
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                >
                    Sign Up
                </Link>

            </div>

        </div>
    );
}

export default Gust