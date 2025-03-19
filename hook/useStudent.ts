// hooks/useStudent.ts
import { useEffect, useState } from 'react';
import { User } from '@clerk/nextjs/server';
import { GetUser } from '../actions/GetUser'

export function useStudent(user: User | null) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      GetUser(user.id)
        .then((data) => {
          setStudent(data);
        })
        .catch((error) => {
          console.error('Failed to fetch student:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return { student, loading };
}