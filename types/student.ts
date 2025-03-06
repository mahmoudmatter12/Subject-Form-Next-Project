interface student{
    id: number;
    clirkId: string;
    fname: string;
    lname: string | null;
    email: string;
    role: "STUDENT" | "ADMIN";
    // Add other fields as needed
}

export default student;