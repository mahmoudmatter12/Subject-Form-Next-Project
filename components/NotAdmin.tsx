import React from 'react';
import Link from 'next/link';

function NotAdmin() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-white mb-8">
          You are not authorized to view this page. Please contact the administrator if you believe this is an error.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotAdmin;