'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SubjectCard from './SubjectCard';
import SubjectCardSkeleton from './SubjectCardSkeleton';

interface Subject {
  id: string;
  subjectCode: string;
  name: string;
  isOpen: boolean;
  prerequisites: string[];
  status: string;
}

export default function SubjectTable() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
    if (response.status === 400) {
      const error = await response.json();
      toast.error(error.message);
    }
    if (response.ok) {
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
    }
  };

  const handleUpdate = async (id: string) => {
    const response = await fetch(`/api/subjects/${id}`, { method: 'POST' });
    if (response.ok) {
      toast.success('Subject updated successfully');
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) => {
          if (subject.id === id) {
            return { ...subject, isOpen: !subject.isOpen };
          }
          return subject;
        })
      );
    }
  };

  useEffect(() => {
    fetch('/api/subjects/open')
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log the response data
        if (data.subjects && Array.isArray(data.subjects)) {
          setSubjects(data.subjects);
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

  if (loading) {
    return (
      <div className="flex gap-4 p-4">
        <SubjectCardSkeleton />
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return <p>No subjects found.</p>;
  }

  return (
    <div className="overflow-x-auto ">
      <div className="flex gap-4 p-4">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id} // Use `id` instead of `SubID`
            subject={subject}
            onEdit={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}