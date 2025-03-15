'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SubjectTable from './SubjectTable';
import SubjectForm from "@/components/Subject/SubjetForm";
import { Separator } from "@/components/ui/separator";
import SubjectCardSkeleton from './SubjectCardSkeleton';

interface Subject {
    id: string;
    subjectCode: string;
    name: string;
    isOpen: boolean;
    prerequisites: string[];
    status: string;
}

function Main() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
        if (response.status === 400) {
            const error = await response.json();
            toast.error(error.message);
        }
        if (response.ok) {
            toast.success('Subject deleted successfully');
            setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
        }
    };

    const handleUpdate = async (id: string) => {
        const response = await fetch(`/api/subjects/${id}`, { method: 'POST' });
        if (response.ok) {
            setSubjects((prevSubjects) =>
                prevSubjects.map((subject) => {
                    if (subject.id === id) {
                        const updatedSubject = { ...subject, isOpen: !subject.isOpen };
                        return updatedSubject;
                    }
                    return subject;
                })
            );
            toast.success(`Subject updated successfully`);
        }
    };

    useEffect(() => {
        fetch('/api/subjects')
            .then((res) => res.json())
            .then((data) => {
                if (data.subjects && Array.isArray(data.subjects)) {
                    setSubjects(data.subjects);
                    setFilteredSubjects(data.subjects);
                } else {
                    console.error('Invalid data format:', data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = subjects;

        // Apply filter
        if (filter === 'open') {
            filtered = filtered.filter((subject) => subject.isOpen);
        } else if (filter === 'closed') {
            filtered = filtered.filter((subject) => !subject.isOpen);
        }

        // Apply search query
        if (searchQuery) {
            filtered = filtered.filter(
                (subject) =>
                    subject.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredSubjects(filtered);
    }, [subjects, filter, searchQuery]);



    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            All Subjects
                        </h2>
                        <p>
                            <span className="text-white">Total Subjects:</span> {subjects.length}
                        </p>
                        <p>
                            <span className="text-white">Total OpendSubjects:</span> {subjects.filter((subject) => subject.isOpen).length}
                        </p>
                    </div>
                    <SubjectForm />
                </div>
                <Separator orientation="horizontal" className="my-4" />
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="filter" className="text-white">
                            Filter:
                        </label>
                        <select
                            name="filter"
                            id="filter"
                            className="p-2 rounded-lg bg-gray-700 text-white"
                            onChange={(e) => setFilter(e.target.value as 'all' | 'open' | 'closed')}
                        >
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 rounded-lg bg-gray-700 text-white ml-4 focus:outline-none"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className='overflow-x-auto custom-scrollbar' >
                    <table className="w-full">
                        {/* Add subject table content here */}
                        {loading && (
                            <div className="flex gap-4 p-4">
                                <SubjectCardSkeleton />
                            </div>
                        )}
                        {!loading && (
                            <SubjectTable
                                filteredSubjects={filteredSubjects}
                                loading={loading}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                                filter={filter}
                                setFilter={setFilter}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        )}
                    </table>
                </div>
            </div >

        </>
    );
}

export default Main;