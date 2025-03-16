'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import SubCard from './SubCard';

interface Subject {
  id: string;
  subjectCode: string;
  name: string;
  prerequisites: string[];
  creditHours: number;
}

const SubjectFormOne = () => {
  const { user } = useUser();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [checkedSubjects, setCheckedSubjects] = useState<{ [key: string]: boolean }>({});
  const [totalChecked, setTotalChecked] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/subjects/open`)
        .then((res) => res.json())
        .then((data) => {
          setSubjects(data.subjects || []);
        });
    }
  }, [user?.id]);

  useEffect(() => {
    const checkedCount = Object.values(checkedSubjects).filter(Boolean).length;
    setTotalChecked(checkedCount);

    const totalCreditHours = subjects
      .filter((subject) => checkedSubjects[subject.id])
      .reduce((sum, subject) => sum + subject.creditHours, 0);
    setTotalHours(totalCreditHours);
  }, [checkedSubjects, subjects]);

  const handleCheckboxChange = useCallback((id: string, isChecked: boolean) => {
    setCheckedSubjects((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-white">Select Subjects</h1>
      <hr className="border-gray-700 mb-6" />

      {/* Stats Section */}
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-6">
        <p className="text-gray-300 text-lg">
          Selected: <span className="text-white font-semibold">{totalChecked}</span>
        </p>
        <p className="text-gray-300 text-lg">
          Total Credit Hours: <span className="text-white font-semibold">{totalHours}</span>
        </p>
      </div>

      {/* Subject Cards */}
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <SubCard
            key={subject.id}
            SubInfo={subject}
            onCheckboxChange={(isChecked) => handleCheckboxChange(subject.id, isChecked)}
          />
        ))}
      </form>
    </div>
  );
};

export default SubjectFormOne;
