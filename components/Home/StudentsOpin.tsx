import React from "react";

function StudentsOpin() {
    const testimonials = [
        {
            initials: "JD",
            name: "John Doe",
            field: "Computer Science",
            feedback:
                "This portal completely transformed how I manage my studies. I can see all my grades and assignments in one place!",
        },
        {
            initials: "AS",
            name: "Alice Smith",
            field: "Engineering",
            feedback:
                "Registering for courses used to be stressful. Now I can plan my semester in minutes. The portal is a game-changer!",
        },
        {
            initials: "MK",
            name: "Michael Karim",
            field: "Business Administration",
            feedback:
                "The UI is clean, and the features are just what I need to keep track of my deadlines and academic progress.",
        },
    ];

    return (
        <section className="py-16  border-2 rounded-xl shadow-md mb-12">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    What Students Are Saying
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((student, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 text-indigo-600 font-bold">
                                    {student.initials}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{student.name}</h4>
                                    <p className="text-gray-500 text-sm">{student.field}</p>
                                </div>
                            </div>
                            <p className="text-gray-600">{student.feedback}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StudentsOpin;
