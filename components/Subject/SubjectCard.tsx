// components/subject/SubjectCard.tsx
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
interface SubjectCardProps {
  subject: {
    id: string;
    subjectCode: string;
    name: string;
    isOpen: boolean;
    prerequisites: string[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SubjectCard({ subject, onEdit, onDelete }: SubjectCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md w-72 border-1 flex-shrink-0 transition-transform transform hover:scale-105 ${subject.isOpen ? 'hover:shadow-green-500' : 'hover:shadow-red-500'}`}>

        {/* Badge for IsOpen */}
        <Badge className={`absolute top-2 right-2 ${subject.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
          {subject.isOpen ? 'Open' : 'Closed'}
        </Badge>

        {/* Subject Code */}
        <h1 className="text-2xl font-bold m-2 text-center mb-2">
          {subject.name}
        </h1>

        {/* Subject Name */}
        <p className="text-gray-600 text-center mb-2">{subject.subjectCode}</p>

        {/* Toggle */}  
        {/* Prerequisites */}
        <p className="text-gray-600 text-center mb-4">
          {subject.prerequisites.length === 0 ? 'No prerequisites' : 'Prerequisites: ' + subject.prerequisites.join(', ')}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">

          <Button className="cursor-pointer" onClick={() => onEdit(subject.id)}>
            {subject.isOpen ? 'Close' : 'Open'}
          </Button>
          <Button variant="destructive" className="cursor-pointer" onClick={() => onDelete(subject.id)}>
            Delete
          </Button>
        </div>
      </div>
  );
}