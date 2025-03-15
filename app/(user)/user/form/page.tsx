'use client';

import SubjectForm from '@/components/Subject/SubjetForm';
import React, { useEffect, useState } from 'react';

interface Subject {
  id: string;
  name: string;
  isOpen: boolean;
}

interface Data {
  subjects: Subject[];
}

function GetData() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return { data, setData };
}

function Page() {
  const { data: subjects, setData } = GetData();
  const [loading, setLoading] = useState(false);

  const handleToggleStatus = async (subjectId: string) => {
    try {
      setLoading(true);

      // Send a POST request to toggle the subject's status
      const response = await fetch(`/api/subjects/${subjectId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Optimistically update the state
        setData((prevData) => ({
          subjects: prevData!.subjects.map((subject) =>
            subject.id === subjectId
              ? { ...subject, isOpen: !subject.isOpen }
              : subject
          ),
        }));
      } else {
        console.error('Failed to update subject');
      }
    } catch (error) {
      console.error('Error updating subject:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
    <SubjectForm onSubmit={(values) => console.log(values)} />
      <h1>Subjects</h1>
      {subjects?.subjects && subjects.subjects.map((subject) => (
        <div key={subject.id}>
          <li>{subject.name}</li>
          <li>{subject.isOpen ? 'open' : 'closed'}</li>
          <li>{subject.id}</li>
          <ul>
            <button
              onClick={() => handleToggleStatus(subject.id)}
              className={`p-4 m-4 cursor-pointer rounded-2xl ${
                subject.isOpen ? 'border-green-400 bg-green-400' : 'border-red-400 bg-red-400'
              }`}
              disabled={loading}
            >
              {subject.isOpen ? 'Close' : 'Open'}
            </button>
          </ul>
        </div>
      ))}
    </>
  );
}

export default Page;