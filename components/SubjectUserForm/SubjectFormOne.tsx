'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import SubCard from './SubCard';
import { toast } from 'react-toastify';

interface Subject {
  id: string;
  subjectCode: string;
  name: string;
  prerequisites: string[];
  creditHours: number;
}

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
}

export function getMaxSubjectsAndHours(cgpa: string): { maxSubjects: number; maxHours: number; } {
  const cgpaNumber = parseFloat(cgpa);

  if (cgpaNumber >= 3) return { maxSubjects: 7, maxHours: 21 };
  if (cgpaNumber >= 2 && cgpaNumber < 3) return { maxSubjects: 6, maxHours: 18 };
  if (cgpaNumber >= 1 && cgpaNumber < 2) return { maxSubjects: 5, maxHours: 15 };
  return { maxSubjects: 4, maxHours: 12 };
}

function canEnrollInSubject(subject: Subject, enrolledSubjects: enrolledSubjects[]): { canEnroll: boolean; reason?: string; status?: 'NOT ENROLLED' | 'PREREQUISITES' | 'PASSED'|'ENROLLED'; } {
  const passedSubjects = enrolledSubjects
    .filter((s) => s.status === 'PASSED')
    .map((s) => s.subject.subjectCode);

  console.log('Passed Subjects:', passedSubjects);
  console.log('Subject Prerequisites:', subject.prerequisites);

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

  if(enrolledSubjects.find((s) => s.subject.subjectCode === subject.subjectCode)) { 
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

export function isMaxSubjectsOrHoursReached(checkedSubjects: { [key: string]: boolean }, subjects: Subject[], maxSubjects: number, maxHours: number): { reached: boolean; message?: string } {
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

const SubjectFormOne = ({ onTotalHoursChange, onTotalCheckedChange, studentInfo, setFeedBackMessage, setIsSubmissionValid ,setCheckedSubjects ,checkedSubjects }: SubjectFormOneProps) => {
  const { user } = useUser();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  // const [checkedSubjects, setCheckedSubjects] = useState<{ [key: string]: boolean }>({});
  const [enrolledSubjects, setEnrolledSubjects] = useState<enrolledSubjects[]>([]);
  const isAlreadyCheckedSubjects = Object.values(checkedSubjects).filter(Boolean).length;
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
            console.log(enrolledSubjectsArray);
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

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const enrollmentResult = canEnrollInSubject(subject, enrolledSubjects);
          // const maxReached = isMaxSubjectsOrHoursReached(checkedSubjects, subjects, getMaxSubjectsAndHours(studentInfo.cgpa).maxSubjects, getMaxSubjectsAndHours(studentInfo.cgpa).maxHours);
          const isDisabled = !enrollmentResult.canEnroll;
          const reason = enrollmentResult.reason ;
          const status = enrollmentResult.status;

          return (
            <SubCard
              key={subject.id}
              SubInfo={subject}
              onCheckboxChange={(isChecked) => handleCheckboxChange(subject.id, isChecked)}
              disabled={isDisabled}
              reason={reason}    
              status={status}
            />
          );
        })}
      </form>
    </div>
  );
};

export default SubjectFormOne;
