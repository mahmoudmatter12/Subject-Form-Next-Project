'use client';
import React, { useState } from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaBell, FaSearch, FaFilter } from 'react-icons/fa';
import AnnCard from './AnnCard';

type AnnouncementType = "critical" | "warning" | "info";

interface Announcement {
    AnnTitle: string;
    AnnDesc: string;
    type: AnnouncementType;
    icon: React.ReactNode;
    viewLink?: string;
    date: string;
}

const announcements: Announcement[] = [
    {
        AnnTitle: "System Maintenance",
        AnnDesc: "There will be a scheduled system maintenance on March 30th, 2025 from 2:00 AM to 5:00 AM EST.",
        type: "critical",
        icon: <FaExclamationTriangle />,
        viewLink: "/system-maintenance",
        date: "2025-03-28T09:00:00"
    },
    {
        AnnTitle: "New Course Available",
        AnnDesc: "A new data science elective has been added for the upcoming semester. Registration opens next Monday.",
        type: "warning",
        icon: <FaInfoCircle />,
        viewLink: "/new-course",
        date: "2025-03-25T14:30:00"
    },
    {
        AnnTitle: "Weekly Newsletter",
        AnnDesc: "Check out this week's newsletter for campus updates, events, and important deadlines.",
        type: "info",
        icon: <FaBell />,
        viewLink: "/newsletter",
        date: "2025-03-24T08:15:00"
    },
    {
        AnnTitle: "Library Closure",
        AnnDesc: "The main library will be closed this Friday for staff training.",
        type: "warning",
        icon: <FaInfoCircle />,
        viewLink: "/library-closure",
        date: "2025-03-22T10:45:00"
    },
    {
        AnnTitle: "Graduation Ceremony",
        AnnDesc: "Important information about the upcoming graduation ceremony and rehearsal schedule.",
        type: "critical",
        icon: <FaExclamationTriangle />,
        viewLink: "/graduation-info",
        date: "2025-03-20T13:20:00"
    },
    {
        AnnTitle: "Scholarship Deadline",
        AnnDesc: "Reminder: Applications for the Dean's Scholarship close next week.",
        type: "warning",
        icon: <FaInfoCircle />,
        viewLink: "/scholarships",
        date: "2025-03-18T11:10:00"
    },
    {
        AnnTitle: "Career Fair",
        AnnDesc: "Annual career fair will be held next month. Register now to secure your spot.",
        type: "info",
        icon: <FaBell />,
        viewLink: "/career-fair",
        date: "2025-03-15T09:30:00"
    }
];

function AnnouncementsLanding() {
    const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements);
    const [selectedType, setSelectedType] = useState<AnnouncementType | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchAndFilter = (query: string, type: AnnouncementType | "all") => {
        const filtered = announcements.filter(ann => {
            const matchesSearch = ann.AnnTitle.toLowerCase().includes(query.toLowerCase()) || 
                                ann.AnnDesc.toLowerCase().includes(query.toLowerCase());
            const matchesType = type === "all" || ann.type === type;
            return matchesSearch && matchesType;
        });
        setFilteredAnnouncements(filtered);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearchAndFilter(query, selectedType);
    };

    const handleFilterChange = (type: AnnouncementType | "all") => {
        setSelectedType(type);
        handleSearchAndFilter(searchQuery, type);
    };

    return (
        <div className="mb-12 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg p-6">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h2 className=" font-bold text-white flex items-center gap-3 mb-2 text-lg md:text-3xl">
                            <span className="bg-indigo-500 w-2 h-6 rounded-full "></span>
                            Announcements
                        </h2>
                        <p className="text-gray-400">
                            Stay updated with the latest news and important information from your institution.
                        </p>
                    </div>
                    
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-col lg:flex-row gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search announcements..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <FaFilter className="text-gray-400" />
                            <select
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                value={selectedType}
                                onChange={(e) => handleFilterChange(e.target.value as AnnouncementType | "all")}
                            >
                                <option value="all">All Announcements</option>
                                <option value="critical">Critical</option>
                                <option value="warning">Important</option>
                                <option value="info">General</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Announcements Grid */}
            {filteredAnnouncements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-gray-700/50 p-6 rounded-full mb-4">
                        <FaBell className="text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No announcements found</h3>
                    <p className="text-gray-400 max-w-md">
                        {searchQuery ? 
                            "Try adjusting your search or filter criteria" : 
                            "There are currently no announcements to display"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAnnouncements
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((announcement, index) => (
                            <AnnCard 
                                key={index} 
                                Announcement={announcement} 
                                className="hover:scale-[1.02] transition-transform"
                            />
                        ))}
                </div>
            )}
        </div>
    );
}

export default AnnouncementsLanding;