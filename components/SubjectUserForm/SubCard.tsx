import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface Subject {
  subjectCode: string;
  name: string;
  prerequisites: string[];
  creditHours: number;
}

interface SubCardProps {
  SubInfo: Subject;
  onCheckboxChange: (isChecked: boolean) => void;
}

function SubCard({ SubInfo, onCheckboxChange }: SubCardProps) {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckboxChange(newChecked);
  };

  return (
    <div
      className={cn(
        'relative p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out',
        'bg-gradient-to-br from-gray-800 to-black hover:scale-105'
      )}
    >
      {/* Credit Hours Badge */}
      <div className="absolute top-4 right-4">
        <Badge className="bg-blue-500 text-white text-sm px-3 py-1">{SubInfo.creditHours} Hrs</Badge>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4">
        {/* Subject Name & Code */}
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-white">{SubInfo.name}</p>
          <p className="text-sm text-gray-400">{SubInfo.subjectCode}</p>
        </div>

        {/* Prerequisites */}
        <div className="flex flex-wrap gap-2">
          {SubInfo.prerequisites.length > 0 ? (
            SubInfo.prerequisites.map((prereq, index) => (
              <Badge key={index} className="bg-gray-700 text-gray-200 px-2 py-1 text-xs">
                {prereq}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500 text-xs">No prerequisites</p>
          )}
        </div>

        {/* Toggle Switch */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <div
            className={cn(
              'w-10 h-5 flex items-center bg-gray-600 rounded-full p-1 transition-all',
              checked ? 'bg-green-500' : 'bg-gray-600'
            )}
          >
            <div
              className={cn(
                'bg-white w-4 h-4 rounded-full shadow-md transform transition-all',
                checked ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </div>
          <span className="text-sm text-gray-300">
            {checked ? 'Selected' : 'Select'}
          </span>
        </label>
      </div>
    </div>
  );
}

export default SubCard;
