'use client'

import React, { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { FaBook, FaLock, FaLockOpen, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SubjectCardSkeleton } from './SubjectCardSkeleton';
import SubjectCard from './SubjectCard';
// import SubjectForm from './SubjetForm';
import Subject from '@/types/subject';
import NewSubjectForm from './NewSubjectForm';

export default function SubjectMainComp() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/subjects');
            const data = await res.json();
            if (data.subjects && Array.isArray(data.subjects)) {
                setSubjects(data.subjects);
                setFilteredSubjects(data.subjects);
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            toast.error('Failed to load subjects');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm('Are you sure you want to delete this subject?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
            if (response.ok) {
                toast.success('Subject deleted successfully');
                setSubjects(prev => prev.filter(subject => subject.id !== id));
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete subject');
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const response = await fetch(`/api/subjects/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'toggle' })
            });

            if (response.ok) {
                const {updatedSubject} = await response.json();
                setSubjects((prevSubjects) =>
                    prevSubjects.map((subject) => {
                        if (subject.id === id) {
                            const updatedSubject = { ...subject, isOpen: !subject.isOpen };
                            return updatedSubject;
                        }
                        return subject;
                    })
                );
                toast.success(`Subject ${updatedSubject.isOpen ? 'opened' : 'closed'} successfully`);
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to update subject');
        }
    };


    useEffect(() => {
        fetchSubjects();
    }, []);

    useEffect(() => {
        let filtered = subjects;

        if (filter === 'open') {
            filtered = filtered.filter(subject => subject.isOpen);
        } else if (filter === 'closed') {
            filtered = filtered.filter(subject => !subject.isOpen);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(subject =>
                subject.subjectCode.toLowerCase().includes(query) ||
                subject.name.toLowerCase().includes(query)
            );
        }

        setFilteredSubjects(filtered);
    }, [subjects, filter, searchQuery]);

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-700/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
                            Subject Management
                        </h2>
                        <div className="flex gap-4 mt-2">
                            <p className="text-gray-400">
                                <span className="text-white">Total:</span> {subjects.length}
                            </p>
                            <p className="text-gray-400">
                                <span className="text-green-400">Open:</span> {subjects.filter(s => s.isOpen).length}
                            </p>
                            <p className="text-gray-400">
                                <span className="text-red-400">Closed:</span> {subjects.filter(s => !s.isOpen).length}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button onClick={fetchSubjects} variant="ghost" className="gap-2">
                            <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <NewSubjectForm onSuccess={fetchSubjects} />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by code, name, or department..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <FiFilter className="text-gray-400" />
                            <select
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as 'all' | 'open' | 'closed')}
                            >
                                <option value="all">All Subjects</option>
                                <option value="open">Open Only</option>
                                <option value="closed">Closed Only</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-1">
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`p-2 rounded ${viewMode === 'cards' ? 'bg-gray-700' : ''}`}
                                title="Card View"
                            >
                                🗂️
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 rounded ${viewMode === 'table' ? 'bg-gray-700' : ''}`}
                                title="Table View"
                            >
                                📊
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                    {[...Array(8)].map((_, i) => (
                        <SubjectCardSkeleton key={i} />
                    ))}
                </div>
            ) : viewMode === 'cards' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map(subject => (
                            <SubjectCard
                                key={subject.id || subject.subjectCode}
                                subject={subject}
                                onToggle={handleToggleStatus}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                                <FaBook className="text-gray-400 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No subjects found</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                {searchQuery ? 'Try adjusting your search or filter' : 'No subjects are currently registered'}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto p-6">
                    <table className="w-full text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Code</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Credits</th>
                                <th scope="col" className="px-6 py-3">Prerequisites</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubjects.length > 0 ? (
                                filteredSubjects.map(subject => (
                                    <tr key={`subject-${subject.id}`} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                                        <td className="px-6 py-4 font-mono text-blue-400">{subject.subjectCode}</td>
                                        <td className="px-6 py-4 font-medium text-white">{subject.name}</td>
                                        <td className="px-6 py-4">{subject.creditHours || '-'}</td>
                                        <td className="px-6 py-4">
                                            {subject.prerequisites?.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {subject.prerequisites.map(pre => (
                                                        <Badge key={pre} variant="outline" className="text-xs text-white">
                                                            {pre}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : 'Prerequisites not required'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge className={subject.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                                {subject.isOpen ? 'Open' : 'Closed'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleToggleStatus(subject.id)}
                                                    className="text-gray-400 hover:text-amber-400 hover:bg-amber-500/10"
                                                >
                                                    {subject.isOpen ? <FaLock size={14} /> : <FaLockOpen size={14} />}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(subject.id)}
                                                    className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                                >

                                                    <FaTrash size={14} />
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                                            <FaBook className="text-gray-400 text-3xl" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">No subjects found</h3>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            {searchQuery ? 'Try adjusting your search or filter' : 'No subjects are currently registered'}
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

