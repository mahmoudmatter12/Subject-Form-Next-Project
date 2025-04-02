import React from 'react';
import Link from 'next/link';
import {
    FaChalkboardTeacher,
    FaBook,
    FaChartLine,
    FaUserCog,
    FaBell,
    FaClipboardList,
    FaCommentDots,
    FaExclamationTriangle
} from 'react-icons/fa';

interface QuickStartLandingProps {
    role: string;
    page?: string;
}

const actions = [
    { href: '/user/dashboard/grades', title: 'My Grades', icon: FaChalkboardTeacher, color: 'text-green-500', border: 'border-green-500', hoverBorder: 'hover:border-green-600', bg: 'group-hover:bg-green-100', description: 'Check your grades and feedback for assignments and exams.' },
    { href: '/user/dashboard/assignments', title: 'Assignments', icon: FaClipboardList, color: 'text-pink-500', border: 'border-pink-500', hoverBorder: 'hover:border-pink-600', bg: 'group-hover:bg-pink-100', description: 'View, submit assignments, and track deadlines.' },
    { href: '/user/dashboard/attendance', title: 'Attendance', icon: FaChalkboardTeacher, color: 'text-orange-500', border: 'border-orange-500', hoverBorder: 'hover:border-orange-600', bg: 'group-hover:bg-orange-100', description: 'Track and review your attendance history.' },
    { href: '/user/dashboard/notifications', title: 'Notifications', icon: FaBell, color: 'text-purple-500', border: 'border-purple-500', hoverBorder: 'hover:border-purple-600', bg: 'group-hover:bg-purple-100', description: 'Stay updated with announcements and alerts.' },
    { href: '/user/profile', title: 'Profile', icon: FaUserCog, color: 'text-blue-500', border: 'border-blue-500', hoverBorder: 'hover:border-blue-600', bg: 'group-hover:bg-blue-100', description: 'Manage your personal info and settings.' },
    { href: '/user/dashboard/feedback', title: 'Feedback', icon: FaCommentDots, color: 'text-pink-500', border: 'border-pink-500', hoverBorder: 'hover:border-pink-600', bg: 'group-hover:bg-pink-100', description: 'Give feedback on courses and instructors.' },
    { href: '/user/dashboard/complains', title: 'Complaints', icon: FaExclamationTriangle, color: 'text-red-500', border: 'border-red-500', hoverBorder: 'hover:border-red-600', bg: 'group-hover:bg-red-100', description: 'Report any concerns or issues.' },
    { href: '/user/dashboard/suggestions', title: 'Suggestions', icon: FaCommentDots, color: 'text-cyan-500', border: 'border-cyan-500', hoverBorder: 'hover:border-cyan-600', bg: 'group-hover:bg-cyan-100', description: 'Share ideas to improve your experience.' },
    { href: '/user/dashboard', title: 'Academic Dashboard', icon: FaChartLine, color: 'text-sky-500', border: 'border-sky-500', hoverBorder: 'hover:border-sky-600', bg: 'group-hover:bg-sky-100', description: 'Monitor grades, GPA, and progress.' },
    { href: '/user/dashboard/courses', title: 'My Courses', icon: FaBook, color: 'text-teal-500', border: 'border-teal-500', hoverBorder: 'hover:border-teal-600', bg: 'group-hover:bg-teal-100', description: 'Manage enrollments and new registrations.' },
    { href: '/user/dashboard/quiz', title: 'Quizzes', icon: FaChalkboardTeacher, color: 'text-yellow-500', border: 'border-yellow-500', hoverBorder: 'hover:border-yellow-600', bg: 'group-hover:bg-yellow-100', description: 'Take quizzes and track your performance.' },
];

function QuikActionLanding({ role , page }: QuickStartLandingProps) {
    return (
        <div className="border-2 rounded-xl shadow-lg p-8 mb-12">

            <div className="flex items-center justify-center mb-6 ">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white items-center">
                    <span className="text-sky-400">Dashboard</span> Actions
                </h1>
            </div>

            <div className={` grid ${page === 'dash' ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'} `}>
                {actions.map((action, index) => (
                    <Link 
                        key={index} 
                        href={action.href} 
                        className={`group relative block p-6 rounded-xl shadow-md border-l-4 ${action.border} ${action.hoverBorder} hover:shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-100`}
                    >
                        {/* Sliding background effect */}
                        <div className={`absolute left-0 top-0 h-full w-0 ${action.bg} transition-all duration-1000 ease-in-out group-hover:w-full`}></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center mb-4 flex-col md:flex-row">
                                <div className={`p-3 rounded-lg ${action.bg} transition-colors`}>
                                    <action.icon className={`${action.color} text-2xl transition-transform duration-300 group-hover:scale-125 `} />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 ml-4 group-hover:translate-x-1 transition-transform">
                                    {action.title}
                                </h2>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {action.description}
                            </p>
                        </div>
                    </Link>
                ))}

                {role === 'ADMIN' && (
                    <Link 
                        href="/admin/dashboard" 
                        className="group relative block p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:border-indigo-600 hover:shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-100"
                    >
                        {/* Sliding background effect */}
                        <div className="absolute left-0 top-0 h-full w-0 bg-indigo-100 transition-all duration-1000 ease-in-out group-hover:w-full"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center mb-4 flex-col md:flex-row">
                                <div className="p-3 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                    <FaUserCog className="text-indigo-500 text-2xl" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 ml-4 group-hover:translate-x-1 transition-transform">
                                    Admin Dashboard
                                </h2>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Manage student records, courses, and system settings.
                            </p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default QuikActionLanding;
