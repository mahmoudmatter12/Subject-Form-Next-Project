import React from "react";
import { FaBookOpen, FaChartLine, FaUsers } from "react-icons/fa";

function FeaturesGust() {
    const features = [
        {
            icon: <FaChartLine className="text-blue-600 text-2xl group-hover:text-blue-700 transition-colors" />,
            bgColor: "bg-blue-50",
            iconBg: "bg-blue-100",
            title: "Grade Tracking",
            description: "Monitor your academic progress with real-time grade updates and GPA calculation.",
        },
        {
            icon: <FaBookOpen className="text-purple-600 text-2xl group-hover:text-purple-700 transition-colors" />,
            bgColor: "bg-purple-50",
            iconBg: "bg-purple-100",
            title: "Course Management",
            description: "Easily register for courses and keep track of your class schedule and requirements.",
        },
        {
            icon: <FaUsers className="text-green-600 text-2xl group-hover:text-green-700 transition-colors" />,
            bgColor: "bg-green-50",
            iconBg: "bg-green-100",
            title: "Student Community",
            description: "Connect with peers, join study groups, and access shared resources.",
        },
    ];

    return (
        <section className="py-16 border-2 rounded-xl shadow-md  mb-12">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Everything You Need in One Place
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-xl hover:shadow-lg transition-shadow group ${feature.bgColor}`}
                        >
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transition-all group-hover:scale-105 ${feature.iconBg}`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesGust;
