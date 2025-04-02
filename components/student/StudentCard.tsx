import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import {  FaIdCard } from 'react-icons/fa';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import student from '@/types/student';

interface StudentCardProps {
  student: student;
  onDelete: (id: string) => void;
}

export default function StudentCard({ student, onDelete }: StudentCardProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-indigo-500/50">
      {/* Header with Image */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Avatar className="h-24 w-24 border-4 border-gray-800">
            <AvatarImage src={student.imgUrl} alt={`${student.fname} ${student.lname}`} />
            <AvatarFallback className="bg-gray-700 text-white">
              {student.fname?.[0]}{student.lname?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Body Content */}
      <div className="pt-14 pb-6 px-6">
        <h3 className="text-xl font-bold text-white text-center mb-1">
          {student.fname} {student.lname}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-4">
          <FaIdCard /> {student.studentId}
        </div>
        
        <div className="text-center text-gray-300 mb-4">
          {student.email}
        </div>

        {/* Academic Info */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Program</div>
            <div className="text-sm font-medium text-white">
              {student.Program || '-'}
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Level</div>
            <div className="text-sm font-medium text-white">
              {student.Level || '-'}
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center col-span-2">
            <div className="text-xs text-gray-400 mb-1">CGPA</div>
            <div className={`text-sm font-medium ${
              student.cgpa && parseFloat(student.cgpa) >= 3.0 ? 'text-green-400' :
              student.cgpa && parseFloat(student.cgpa) >= 2.0 ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {student.cgpa || 'N/A'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => router.push(`/admin/students/${student.id}`)}
            className="flex items-center gap-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <FiEye size={14} /> View
          </button>
          <button
            onClick={() => router.push(`/admin/students/${student.id}/edit`)}
            className="flex items-center gap-1 text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <FiEdit2 size={14} /> Edit
          </button>
          <button
            onClick={() => student.id && onDelete(student.id)}
            className="flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}