'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import SubCard from './SubCard';
import { toast } from 'react-toastify';
import Subject from '@/types/subject';

interface enrolledSubjects {
  status: string;
  subject: Subject;
}

interface SubjectFormOneProps {
  onTotalHoursChange: (hours: number) => void;
  onTotalCheckedChange: (count: number) => void;
  studentInfo: { arabicName: string; email: string; phoneNumber: string; studentId: string; academicGuide: string; cgpa: string; };
  setFeedBackMessage: (message: string) => void;
  setIsSubmissionValid?: (isValid: boolean) => void;
  setCheckedSubjects?: (checkedSubjects: { [key: string]: boolean }) => void;
  checkedSubjects: { [key: string]: boolean };
  setFilteredSubjects?: (filteredSubjects: Subject[]) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  totalSubjects?: number;
  setTotalSubjects?: (total: number) => void;
}

function getMaxSubjectsAndHours(cgpa: string): { maxSubjects: number; maxHours: number; } {
  const cgpaNumber = parseFloat(cgpa);

  if (cgpaNumber >= 3) return { maxSubjects: 7, maxHours: 21 };
  if (cgpaNumber >= 2 && cgpaNumber < 3) return { maxSubjects: 6, maxHours: 18 };
  if (cgpaNumber >= 1 && cgpaNumber < 2) return { maxSubjects: 5, maxHours: 15 };
  return { maxSubjects: 4, maxHours: 12 };
}

function canEnrollInSubject(subject: Subject, enrolledSubjects: enrolledSubjects[]): { canEnroll: boolean; reason?: string; status?: 'NOT ENROLLED' | 'PREREQUISITES' | 'PASSED' | 'ENROLLED'; } {
  const passedSubjects = enrolledSubjects
    .filter((s) => s.status === 'PASSED')
    .map((s) => s.subject.subjectCode);

  // console.log('Passed Subjects:', passedSubjects);
  // console.log('Subject Prerequisites:', subject.prerequisites);

  if (passedSubjects.includes(subject.subjectCode)) {
    return {
      canEnroll: false,
      reason: `You cannot enroll in ${subject.name} (${subject.subjectCode}) because you have already passed it.`,
      status: 'PASSED',
    };
  }

  const missingPrerequisites = subject.prerequisites.filter(
    (prerequisite) => !passedSubjects.includes(prerequisite)
  );

  if (missingPrerequisites.length > 0) {
    return {
      canEnroll: false,
      reason: `You cannot enroll in ${subject.name} (${subject.subjectCode}) because you have not passed the following prerequisites: ${missingPrerequisites.join(', ')}. `,
      status: 'PREREQUISITES',
    };
  }

  if (enrolledSubjects.find((s) => s.subject.subjectCode === subject.subjectCode)) {
    return {
      canEnroll: false,
      reason: `You are already enrolled in ${subject.name} (${subject.subjectCode}).`,
      status: 'ENROLLED',
    };
  }

  return {
    canEnroll: true,
    reason: `You are eligible to enroll in ${subject.name} (${subject.subjectCode}).`,
    status: 'NOT ENROLLED',
  };
}

function isMaxSubjectsOrHoursReached(checkedSubjects: { [key: string]: boolean }, subjects: Subject[], maxSubjects: number, maxHours: number): { reached: boolean; message?: string } {
  const totalChecked = Object.values(checkedSubjects).filter(Boolean).length;
  const totalHours = subjects
    .filter((subject) => checkedSubjects[subject.id])
    .reduce((sum, subject) => sum + subject.creditHours, 0);

  if (totalChecked > maxSubjects) {
    return { reached: true, message: `You can only select up to ${maxSubjects} subjects.` };
  }

  if (totalHours > maxHours) {
    return { reached: true, message: `You can only select up to ${maxHours} credit hours.` };
  }

  return { reached: false };
}

const SubjectFormOne = ({ onTotalHoursChange, onTotalCheckedChange, studentInfo, setFeedBackMessage, setIsSubmissionValid, setCheckedSubjects, checkedSubjects }: SubjectFormOneProps) => {
  const { user } = useUser();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [enrolledSubjects, setEnrolledSubjects] = useState<enrolledSubjects[]>([]);
  const isAlreadyCheckedSubjects = Object.values(checkedSubjects).filter(Boolean).length;

  // total available subjects is the subjects that the user can select the subjects are that its status is not enrolled or passed or prerequisites
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>(subjects);
  const [searchQuery, setSearchQuery] = useState('');

  const totalAvailableSubjects = subjects.filter((subject) => {
    const enrollmentResult = canEnrollInSubject(subject, enrolledSubjects);
    return enrollmentResult.canEnroll;
  }
  );

  console.log('Total Available Subjects:', totalAvailableSubjects.length);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = subjects.filter((subject) => {
      return subject.name.toLowerCase().includes(query.toLowerCase()) || subject.subjectCode.toLowerCase().includes(query.toLowerCase());
    }
    );
    setFilteredSubjects(filtered);
  };

  const handleFilter = (filter: 'all' | 'NotEnrolled' | 'prerequisites') => {
    if (filter === 'all') {
      setFilteredSubjects(subjects);
    } else if (filter === 'NotEnrolled') {
      const filtered = subjects.filter((subject) => {
        const enrollmentResult = canEnrollInSubject(subject, enrolledSubjects);
        return enrollmentResult.canEnroll;
      }
      );
      setFilteredSubjects(filtered);
    } else if (filter === 'prerequisites') {
      const filtered = subjects.filter((subject) => {
        const enrollmentResult = canEnrollInSubject(subject, enrolledSubjects);
        return !enrollmentResult.canEnroll;
      }
      );
      setFilteredSubjects(filtered);
    }
    else if (filter === 'Enrolled') {
      const filtered = subjects.filter((subject) => {
        const enrollmentResult = canEnrollInSubject(subject, enrolledSubjects);
        return !enrollmentResult.canEnroll;
      }
      );
      setFilteredSubjects(filtered);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/subjects/open`)
        .then((res) => res.json())
        .then((data) => {
          setSubjects(data.subjects || []);
        })
        .catch((error) => {
          console.error('Error fetching subjects:', error);
        });
    }
  }, [user?.id]);

  useEffect(() => {
    try {
      if (user?.id) {
        fetch(`/api/user/enroll/${user.id}`)
          .then((res) => res.json())
          .then((data) => {
            const enrolledSubjectsArray = data.subjects || [];
            setEnrolledSubjects(enrolledSubjectsArray);
            // console.log(enrolledSubjectsArray);
          })
          .catch((error) => {
            console.error('Error fetching enrolled subjects:', error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [user?.id]);

  useEffect(() => {
    const checkedCount = Object.values(checkedSubjects).filter(Boolean).length;
    onTotalCheckedChange(checkedCount);

    const totalCreditHours = subjects
      .filter((subject) => checkedSubjects[subject.id])
      .reduce((sum, subject) => sum + subject.creditHours, 0);
    onTotalHoursChange(totalCreditHours);
  }, [checkedSubjects, subjects, onTotalHoursChange, onTotalCheckedChange]);

  useEffect(() => {
    handleSearch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, searchQuery]);

  const handleCheckboxChange = useCallback(
    (id: string, isChecked: boolean) => {
      const subject = subjects.find((s) => s.id === id);
      if (!subject) return;

      const enrollmentResult = canEnrollInSubject(subject, enrolledSubjects);
      if (!enrollmentResult.canEnroll) {
        toast.error(enrollmentResult.reason);
        return;
      }
      const newCheckedSubjects = { ...checkedSubjects, [id]: isChecked };


      // const totalChecked = Object.values(newCheckedSubjects).filter(Boolean).length;
      // const totalHours = subjects
      //   .filter((s) => newCheckedSubjects[s.id])
      //   .reduce((sum, s) => sum + s.creditHours, 0);

      if (setCheckedSubjects) {
        setCheckedSubjects(newCheckedSubjects);
      }
    },
    [subjects, enrolledSubjects, checkedSubjects, setCheckedSubjects]
  );

  useEffect(() => {
    if (subjects.length === 0) {
      setFeedBackMessage('No subjects available for enrollment.');
      setIsSubmissionValid?.(false);
    } else {
      const { maxSubjects, maxHours } = getMaxSubjectsAndHours(studentInfo.cgpa);
      const newCheckedSubjects = { ...checkedSubjects };
      if (isMaxSubjectsOrHoursReached(newCheckedSubjects, subjects, maxSubjects, maxHours).reached) {
        setFeedBackMessage(`You can only select up to ${maxSubjects} subjects and ${maxHours} credit hours. Please uncheck some subjects to proceed.`);
        setIsSubmissionValid?.(false);
      } else {
        if (isAlreadyCheckedSubjects < 4) {
          setFeedBackMessage('Please select at least 4 subject to proceed. still remaining subjects are: ' + (4 - isAlreadyCheckedSubjects));
          setIsSubmissionValid?.(false);
        } else {
          setFeedBackMessage('');
          setIsSubmissionValid?.(true);
        }
      }
    }
  }, [subjects, setFeedBackMessage, studentInfo, checkedSubjects, setIsSubmissionValid, isAlreadyCheckedSubjects]);


  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-white">Select Subjects</h1>
      <hr className="border-gray-700 mb-6" />
      <div className="flex items-center gap-4 mb-4 rounded-2xl p-4 bg-gray-800">
        <p className="text-lg text-gray-400">Total Subjects:
          <br />
          <span className=' text-white '>
            {subjects.length}
          </span></p>
        <p className="text-lg text-gray-400">Total Available Subjects to select:<br />
          <span className='text-white'>{totalAvailableSubjects.length}</span></p>
      </div>

      {/* filter and search */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search subjects by name or code"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="flex items-center gap-4 mb-4">
            <select
              className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg"
              onChange={(e) => handleFilter(e.target.value as 'all' | 'NotEnrolled' | 'prerequisites')}
            >
              <option value="all">All</option>
              <option value="NotEnrolled">Not Enrolled</option>
              <option value="prerequisites">Other</option>
            </select>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredSubjects.length !== 0 ? (
          filteredSubjects.map((subject) => {
            const enrollmentResult = canEnrollInSubject(subject, enrolledSubjects);
            const isDisabled = !enrollmentResult.canEnroll;
            const reason = enrollmentResult.reason;
            const status: 'NOT ENROLLED' | 'PREREQUISITES' | 'PASSED' | 'ENROLLED' = enrollmentResult.status || 'NOT ENROLLED';

            return (
              <SubCard
                key={subject.id}
                SubInfo={subject}
                checked={checkedSubjects[subject.id] || false}
                onCheckboxChange={(isChecked) => handleCheckboxChange(subject.id, isChecked)}
                disabled={isDisabled}
                reason={reason}
                status={status}
              />
            );
          })
        ) : (
          <p className="text-gray-500 text-lg">
            <SubCard
              SubInfo={{ name: 'No subjects found', subjectCode: 'No subjects found', creditHours: 0, prerequisites: [] }}
              checked={false}
              onCheckboxChange={(isChecked) => handleCheckboxChange('No subjects found', isChecked)}
              disabled={true}
              reason={'No subjects found'}
              status={'NOT FOUND'}
            />
          </p>
        )
        }

      </form>
    </div>
  );
};

export default SubjectFormOne;
