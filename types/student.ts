interface student{
    name: ReactNode;
    id?: string;
    clirkId?: string;
    fname?: string;
    lname?: string | null;
    email?: string;
    role?: "STUDENT" | "ADMIN";
    studentId?: string;
    imgUrl?: string
    // Add other fields as needed
}

export default student;