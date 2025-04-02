import React from 'react';
import Link from 'next/link';
import FeaturesGust from './FeaturesGust';
import StudentsOpin from './StudentsOpin';

function Guest() {
  return (
    <div className="min-h-screen ">
      {/* Navigation */}
      {/* make in the header or the layout */}
      {/* <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MdSchool className="text-indigo-600 text-2xl" />
            <span className="text-xl font-bold text-indigo-800">Student Union Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/sign-in" 
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center border-2 rounded-lg shadow-md mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Your Gateway to <span className="text-sky-400">Academic Success</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Track your grades, manage courses, and stay organized with our comprehensive student portal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/sign-up"
            className="bg-sky-400 text-white px-8 py-3 rounded-lg hover:bg-sky-600 text-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Join Now - Its Free
          </Link>
          <Link
            href="/sign-in"
            className="bg-white text-sky-600 px-8 py-3 rounded-lg border border-indigo-200 hover:bg-sky-50 text-lg font-medium shadow-sm hover:shadow-md transition-all"
          >
            Existing User? Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesGust />

      <StudentsOpin />

      {/* Call to Action */}
      <section className="py-16 border-2 rounded-lg  text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Academic Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already achieving more with our portal.
          </p>
          <Link
            href="/sign-up"
            className="bg-white text-sky-600 px-8 py-3 rounded-lg hover:bg-indigo-50 text-lg font-medium shadow-md inline-block transition-all"
          >
            Get Started Now
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Guest;