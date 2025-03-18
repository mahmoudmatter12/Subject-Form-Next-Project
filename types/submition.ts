import Subject from './subject';
export default interface Submission {
    id: string;
    studentId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    subjects: Subject[];
}

