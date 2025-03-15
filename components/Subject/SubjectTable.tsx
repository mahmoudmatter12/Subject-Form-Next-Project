'use client';

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

interface SubjectTableProps {
  filteredSubjects: Subject[];
  loading: boolean;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
  filter: 'all' | 'open' | 'closed';
  setFilter: (filter: 'all' | 'open' | 'closed') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SubjectTable({
  filteredSubjects,
  loading,
  handleDelete,
  handleUpdate,
}: SubjectTableProps) {
  if (loading) {
    return (
      <div className="flex gap-4 p-4">
        <SubjectCardSkeleton />
      </div>
    );
  }

  return (
    <>
      <div >
        <div className="flex gap-4 p-4">
          {filteredSubjects.length === 0 && (
            <div className="text-white p-8 rounded-lg border-2">No subjects found</div>
          )}
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onEdit={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}