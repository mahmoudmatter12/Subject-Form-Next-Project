'use client';

import { useEffect, useState } from 'react';
import student from '@/types/student';
import { toast } from 'react-toastify';
import CardSkeleton from './CardSkeleton';

export default function StudentsTable() {
  const [students, setStudents] = useState<student[]>([]);
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
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    }
  };

  useEffect(() => {
    fetch('/api/admin/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false); // ✅ Fixed: setLoading only after data is received
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <>
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">Email</th>
          <th className="text-left">Student ID</th>
          <th className="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.fname} {student.lname}</td>
            <td>{student.email}</td>
            <td>{student.studentId}</td>
            <td>
              <button className="text-blue-500 hover:underline" onClick={() => handleUpdate(student.id)}>Edit</button>
              <button className="text-red-500 hover:underline ml-2" onClick={() => handleDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </>

  );
}
