import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface StudentCardProps {
    student: {
        id: string;
        fname: string;
        lname: string | null;
        email: string;
        studentId: string;
        imgUrl?: string;
    };
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
    return (
        <div className="p-6 rounded-lg shadow-md w-72 flex-shrink-0 transition-transform transform hover:scale-105 hover:shadow-light-blue-500/50">
            {/* User Image */}
            <div className="flex items-center justify-center mb-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={student.imgUrl} alt={`${student.fname} ${student.lname}`} />
                <AvatarFallback>{student.fname[0]}{student.lname?.[0] || ''}</AvatarFallback>
            </Avatar>
            </div>

            {/* User Name */}
            <h2 className="text-xl font-bold text-center mb-2">
            {student.fname} {student.lname}
            </h2>

            {/* User Email */}
            <p className="text-gray-600 text-center mb-2">{student.email}</p>

            {/* Student ID */}
            <p className="text-gray-600 text-center mb-4">{student.studentId}</p>

            {/* Actions */}
            <div className="flex justify-center gap-4">
            <Button className='cursor-pointer' onClick={() => onEdit(student.id)}>
                Edit
            </Button>
            <Button variant="destructive" className='cursor-pointer' onClick={() => onDelete(student.id)}>
                Delete
            </Button>
            </div>
        </div>
    );
}