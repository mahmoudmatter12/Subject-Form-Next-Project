"use client";
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
interface Submission {
  id: string;
  createdAt: string;
  status: string;

}

interface SubmissionCardProps {
  submission: Submission;
}

export default function SubmissionCard({ submission }: SubmissionCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`submission/${submission.id}`);
  };

  return (
    <div
      className="bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-600 transition-colors"
      onClick={handleClick}
    >

      
      <div className="flex justify-between items-center">

        <div>
          <p className="text-lg font-bold">Submission #{submission.id.slice(-6)}</p>
          <p className="text-sm">Created At: {new Date(submission.createdAt).toLocaleString()}</p>
          <Badge color={submission.status === 'ACCEPTED' ? 'green' : submission.status === 'REJECTED' ? 'red' : 'yellow'}
            className={`mt-2 rounded-lg px-2 py-1 text-xs font-semibold text-center w-20 ${submission.status === 'ACCEPTED' ? 'bg-green-800' : submission.status === 'ACCEPTED' ? 'bg-red-800' : 'bg-yellow-700'}`}
          >
            {submission.status}
            </Badge>
            
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors m-2"
          onClick={(e) => {
            e.stopPropagation();
            // Handle PDF generation
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}