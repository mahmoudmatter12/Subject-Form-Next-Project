
interface Subject {
    id: string;
    subjectCode: string;
    name: string;
    isOpen: boolean;
    creditHours: number;
    prerequisites: string[];
    createdAt: string;
}

export default Subject; 