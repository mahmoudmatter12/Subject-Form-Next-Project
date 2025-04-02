import React from "react";
import { FaBook, FaChalkboardTeacher } from "react-icons/fa";

function RecentActivityLanding() {
    const activities = [
        {
            icon: <FaChalkboardTeacher className="text-[#0ea5e9] group-hover:text-[#0284c7] transition-colors" />,
            bgColor: "group-hover:bg-[#bae6fd]",
            title: "New grade posted for CS101",
            description: "Assignment 3: 95/100",
        },
        {
            icon: <FaBook className="text-[#06b6d4] group-hover:text-[#0891b2] transition-colors" />,
            bgColor: "group-hover:bg-[#a5f3fc]",
            title: "Course registration open",
            description: "Spring 2023 courses now available",
        },
    ];

    return (
        <div className="border-2 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-white md:text-4xl lg:text-4xl text-center mb-6">Recent Activity</h2>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="flex items-start bg-white p-4 rounded-lg hover:shadow-lg transition-all group"
                    >
                        <div className={`p-2 rounded-full mr-4 transition-colors bg-[#e0f2fe] ${activity.bgColor}`}>
                            {activity.icon}
                        </div>
                        <div>
                            <p className="font-medium text-[#1f2937]">{activity.title}</p>
                            <p className="text-sm text-[#6b7280]">{activity.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentActivityLanding;
