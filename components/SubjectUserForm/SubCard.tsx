import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface Subject {
  subjectCode: string;
  name: string;
  prerequisites: string[];
  creditHours: number;
}

interface SubCardProps {
  SubInfo: Subject;
  onCheckboxChange: (isChecked: boolean) => void;
  disabled?: boolean;
  checked?: boolean;
  reason?: string;
  status: 'NOT ENROLLED' | 'PREREQUISITES' | 'PASSED' | 'ENROLLED' | 'NOT FOUND';
}

function SubCard({ SubInfo, onCheckboxChange, disabled, reason, status }: SubCardProps) {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckboxChange(newChecked);
  };
  // console.log('SubInfo:', reason);
  return (
    <div
      className={cn(
        'relative p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out',
        'bg-gradient-to-br from-gray-800 to-sky-950 hover:scale-105',
        {
          'opacity-50': disabled,
          'opacity-100': !disabled
        },
        {
          'border border-red-700': status === 'PASSED',
          'border border-yellow-700': status === 'PREREQUISITES',
          'border border-blue-700': status === 'ENROLLED',
          'border border-gray-700': status === 'NOT FOUND',
          'border border-green-700': status === 'NOT ENROLLED'
        },
        {
          'cursor-not-allowed': disabled
        },
        {
          'hover:shadow-red-700': status === 'PASSED',
          'hover:shadow-yellow-700': status === 'PREREQUISITES',
          'hover:shadow-blue-700': status === 'ENROLLED',
          'hover:shadow-gray-700': status === 'NOT FOUND',
          'hover:shadow-green-700': status === 'NOT ENROLLED'
        }
      )}
    >
      {/* Credit Hours Badge */}
      <div className="absolute top-4 right-4">
        <Badge className={cn(
          'text-white text-sm px-3 py-1',
          status === 'PASSED' ? 'bg-red-700' :
        status === 'PREREQUISITES' ? 'bg-yellow-700' :
          status === 'ENROLLED' ? 'bg-blue-700' :
            status === 'NOT FOUND' ? 'bg-gray-700' :
          'bg-green-700'
        )}>
          {SubInfo.creditHours} Hrs
        </Badge>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4">
        {/* Subject Name & Code */}
        <div>
          <p className="text-lg font-semibold text-white">{SubInfo.name}</p>
          <p className="text-sm text-gray-400">{SubInfo.subjectCode}</p>
        </div>

        {/* Status */}

        {status && (
          <div className="mt-2">
            <Badge className="bg-gray-700 text-gray-200 px-2 py-1 text-xs">{status}</Badge>
            {/* {reason && <p className="text-xs text-gray-500 mt-1">{reason}</p>} */}
          </div>
        )}

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


        {/* view why */}
        {/* {(status === "PREREQUISITES" || status === "NOT ENROLLED" || status === "PASSED") && ( */}
        {/* <div className="flex items-center gap-2"> */}
        {/* <button className="text-sm text-gray-400 underline">View why?</button> */}
        {/* </div> */}
        {/* )} */}

        {(status === "PREREQUISITES" || status === "PASSED" || status === "ENROLLED" || status==="NOT FOUND") && (
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-sm text-gray-400 underline">View why?</button>
              </TooltipTrigger>
              <TooltipContent className="bg-gradient-to-r from-gray-900 to-gray-700 text-center text-white text-[15px] p-2 max-w-2xs rounded-md">
                {reason}
              </TooltipContent>
            </Tooltip>
          </div>
        )}


        {/* Toggle Switch with Tooltip */}
        {(status !== "ENROLLED" && status !== "PREREQUISITES" && status!=="NOT FOUND") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checked}
                  onChange={handleCheckboxChange}
                  disabled={disabled}
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
            </TooltipTrigger>
            {disabled && reason && (

              <TooltipContent className="bg-gradient-to-r from-gray-900 to-gray-700 text-center text-white text-[15px] p-2 max-w-2xs rounded-md">
                {reason}
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default SubCard;
