'use client';

import { useEffect, useState } from 'react';
import Student from '@/types/student';
import { toast } from 'react-toastify';
// import CardSkeleton from './CardSkeleton';
import StudentCard from './StudentCard';
import StudentCardSkeleton from './StudentCardSkeleton';

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/${id}`, { method: 'DELETE' });
    if (response.status === 400) {
      const error = await response.json();
      toast.error(error.message);
    }
    if (response.ok) {
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    }
  };

  const handleUpdate = async (id: string) => {
    const response = await fetch(`/api/admin/students/${id}`, { method: 'PUT' });
    if (response.ok) {
      toast.success('Student updated successfully');
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    }
  };

  useEffect(() => {
    fetch('/api/admin/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <StudentCardSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 p-4 ">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}