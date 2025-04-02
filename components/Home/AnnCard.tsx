import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';

type AnnCardProps = {
    Announcement: {
        AnnTitle: string;
        AnnDesc: string;
        type: "critical" | "warning" | "info";
        icon: React.ReactNode;
        viewLink?: string;
        date: string;
    };
    className?: string;
};

const typeStyles = {
    critical: {
        border: "border-l-red-500",
        bg: "bg-red-500/10",
        text: "text-red-400",
        badge: "bg-red-500/20 text-red-400",
        hover: "hover:bg-red-500/15"
    },
    warning: {
        border: "border-l-amber-500",
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        badge: "bg-amber-500/20 text-amber-400",
        hover: "hover:bg-amber-500/15"
    },
    info: {
        border: "border-l-blue-500",
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        badge: "bg-blue-500/20 text-blue-400",
        hover: "hover:bg-blue-500/15"
    }
};

function AnnCard({ Announcement, className = "" }: AnnCardProps) {
    const styles = typeStyles[Announcement.type] || typeStyles.info;
    const formattedDate = formatDistanceToNow(new Date(Announcement.date), { addSuffix: true });

    return (
        <div className={`${styles.border} ${styles.hover} ${styles.bg} border-l-4 rounded-lg p-5 h-full flex flex-col ${className}`}>
            <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${styles.badge}`}>
                    {Announcement.icon}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[15px] font-semibold text-white mb-1">{Announcement.AnnTitle}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2 hidden sm:inline">
                            {formattedDate}
                        </span>
                    </div>
                    <span className={`text-xs font-medium ${styles.badge} px-2 py-1 rounded-full inline-block mb-2`}>
                        {Announcement.type === "critical" ? "Critical" : 
                         Announcement.type === "warning" ? "Important" : "General"}
                    </span>
                </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-5 flex-1">{Announcement.AnnDesc}</p>
            
            {Announcement.viewLink && (
                <Link
                    href={Announcement.viewLink}
                    className={`mt-auto inline-flex items-center text-sm font-medium ${styles.text} group transition-colors`}
                >
                    View details
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            )}
        </div>
    );
}

export default AnnCard;