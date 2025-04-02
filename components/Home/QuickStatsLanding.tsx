import React from 'react'
const QuickStats = [
    {
        label: "Current GPA",
        value: "3.75",
        color: "text-[#0ea5e9]",
        bg: "hover:bg-[#e0f2fe]",
    },
    {
        label: "Enrolled Courses",
        value: "5",
        color: "text-[#06b6d4]",
        bg: "hover:bg-[#ccfbf1]",
    },
    {
        label: "Credits Earned",
        value: "42",
        color: "text-[#10b981]",
        bg: "hover:bg-[#d1fae5]",
    },
    {
        label: "Upcoming Deadlines",
        value: "3",
        color: "text-[#6366f1]",
        bg: "hover:bg-[#e0e7ff]",
    }
]
function QuickStatsLanding() {
    return (
        <>
            <div className="rounded-xl shadow-md p-6 mb-12 border-2 ">
                <h2 className="text-xl font-semibold text-white md:text-2xl lg:text-4xl mb-6 text-center">Quick Starts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {QuickStats.map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-white p-4 rounded-lg shadow-sm transition-all duration-300 ${stat.bg} hover:shadow-lg hover:scale-105`}
                        >
                            <p className={`text-sm font-medium ${stat.color}`}>{stat.label}</p>
                            <p className="text-2xl font-bold text-[#1f2937]">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default QuickStatsLanding