// hooks/useStudent.ts
import { useEffect, useState } from 'react';
import { GetUser } from '../actions/GetUser';
import student from '@/types/student';

export function useStudent(userId: string | null) {
  const [student, setStudent] = useState<student | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    GetUser(userId)
      .then((data) => {
        setStudent(data);
      })
      .catch((error) => {
        console.error('Failed to fetch student:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return { student, loading };
}