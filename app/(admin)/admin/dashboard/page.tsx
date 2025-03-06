import React from 'react'
import student from '@/types/student'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import NotAdmin from '@/components/NotAdmin'
import StudentsTable from '@/components/studentsTable'
import { GetUser } from '@/lib/GetUser'

const Admin = async () => {
    const { userId } = await auth();
    const student = await GetUser('/admin/dashboard');
    const { role } = student as student;

    if (!userId) {
        redirect('/sign-in');
    }

    if (role !== 'ADMIN') {
        return <>
        <NotAdmin />
        </>
    }

    // admin functions => 
    // show all students, add students, delete students, update students
    // add subject, delete subject, update subject, show all subjects
    // show specific student, show specific subject
    return (
        <div>
            <h1>Welcome to the Admin Dashboard</h1>
            <StudentsTable />
            
        </div>
    )
}


export default Admin