'use client';

import { useEffect, useState } from 'react';
import student from '@/types/student';
import { toast } from 'react-toastify';
import CardSkeleton from './CardSkeleton';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
      toast.success('Student updated successfully');
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
      <Table>
        <TableCaption>A list of your recent students.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800 text-gray-300 hover:bg-transparent">
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Student ID</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.fname} {student.lname}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>
                <button className="text-blue-500 hover:underline" onClick={() => handleUpdate(student.id)}>Edit</button>
                <button className="text-red-500 hover:underline ml-2" onClick={() => handleDelete(student.id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>

  );
}
